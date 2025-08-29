"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    for (let i = 0; i < 5; i++) {
        const user = await prisma.user.create({
            data: {
                email: faker_1.faker.internet.email(),
                password: faker_1.faker.internet.password(),
                role: client_1.Roles.CUSTOMER,
                CustomerProfile: {
                    create: {
                        name: faker_1.faker.person.fullName(),
                        phone: faker_1.faker.phone.number(),
                        address: faker_1.faker.location.streetAddress(),
                        city: faker_1.faker.location.city(),
                        state: faker_1.faker.location.state(),
                        postalCode: faker_1.faker.location.zipCode(),
                        country: faker_1.faker.location.country(),
                        profilePicture: faker_1.faker.image.avatar(),
                    },
                },
            },
        });
        console.log(`Created user: ${user.email}`);
    }
    const admin = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password: 'admin123',
            role: client_1.Roles.SUPER_ADMIN,
            AdminProfile: {
                create: {
                    name: 'Super Admin',
                    phone: faker_1.faker.phone.number(),
                },
            },
        },
    });
    console.log(`Created admin: ${admin.email}`);
    for (let i = 0; i < 10; i++) {
        const product = await prisma.product.create({
            data: {
                name: faker_1.faker.commerce.productName(),
                categoryName: faker_1.faker.commerce.department(),
                discountedPrice: faker_1.faker.number.float({ min: 100, max: 500, fractionDigits: 2 }),
                actualPrice: faker_1.faker.number.float({ min: 500, max: 1000, fractionDigits: 2 }),
                description: faker_1.faker.commerce.productDescription(),
                stockCount: faker_1.faker.number.int({ min: 10, max: 100 }),
                isStock: true,
                images: {
                    create: [
                        {
                            url: faker_1.faker.image.url(),
                            altText: faker_1.faker.commerce.productAdjective(),
                            isMain: true,
                        },
                    ],
                },
            },
        });
        console.log(`Created product: ${product.name}`);
    }
    for (let i = 0; i < 3; i++) {
        await prisma.coupon.create({
            data: {
                couponName: `DISCOUNT${i + 1}`,
                ValueType: i % 2 === 0 ? 'percentage' : 'amount',
                Value: i % 2 === 0 ? '10' : '200',
                minimumSpent: 1000,
                usageLimitPerPerson: 1,
                validFrom: '2025-01-01',
                ValidTill: '2025-12-31',
            },
        });
    }
    const customer = await prisma.customerProfile.findFirst();
    const product = await prisma.product.findFirst();
    if (customer && product) {
        const order = await prisma.order.create({
            data: {
                orderNumber: `ORD-${Date.now()}`,
                status: client_1.OrderStatus.confirmed,
                paymentStatus: client_1.PaymentStatus.completed,
                totalAmount: product.discountedPrice,
                shippingCost: 50,
                taxAmount: 18,
                discountAmount: 0,
                CustomerProfile: {
                    connect: { id: customer.id },
                },
                items: {
                    create: [
                        {
                            product: { connect: { id: product.id } },
                            quantity: 2,
                            discountedPrice: product.discountedPrice,
                            actualPrice: product.actualPrice,
                        },
                    ],
                },
                Payment: {
                    create: {
                        amount: product.discountedPrice,
                        method: client_1.PaymentMethod.credit_card,
                        status: client_1.PaymentStatus.completed,
                        transactionId: faker_1.faker.string.uuid(),
                    },
                },
            },
        });
        console.log(`Created sample order: ${order.orderNumber}`);
    }
    console.log('✅ Seeding completed!');
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map