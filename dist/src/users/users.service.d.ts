import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCustomer(createUserDto: CreateUserDto): Promise<{
        CustomerProfile: {
            id: string;
            name: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            landmark: string | null;
            postalCode: string | null;
            country: string | null;
            profilePicture: string | null;
            userId: string;
        };
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createAdmin(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(role?: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    CutomerProfile(id: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
        CustomerProfile: {
            name: string;
            phone: string;
            address: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            profilePicture: string;
            addresses: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                phone: string | null;
                address: string;
                city: string;
                state: string;
                landmark: string | null;
                postalCode: string;
                country: string;
                customerProfileId: string | null;
                isDefault: boolean;
            }[];
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string | null;
                rating: number;
                comment: string | null;
            }[];
            couponUsages: {
                id: string;
                customerProfileId: string | null;
                couponId: string;
                usedAt: Date;
            }[];
            orders: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                notes: string | null;
                orderNumber: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
                totalAmount: import("@prisma/client/runtime/library").Decimal;
                shippingCost: import("@prisma/client/runtime/library").Decimal;
                taxAmount: import("@prisma/client/runtime/library").Decimal;
                discountAmount: import("@prisma/client/runtime/library").Decimal;
                shippingAddressId: string | null;
                trackingID: string | null;
                customerProfileId: string | null;
            }[];
            cart: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string | null;
                customerProfileId: string | null;
                quantity: number | null;
            }[];
        };
    }>;
    AdminProfile(id: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
        AdminProfile: {
            name: string;
            phone: string;
            profilePicture: string;
            notes: string;
        };
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
        CustomerProfile: {
            phone: string;
            profilePicture: string;
            addresses: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                phone: string | null;
                address: string;
                city: string;
                state: string;
                landmark: string | null;
                postalCode: string;
                country: string;
                customerProfileId: string | null;
                isDefault: boolean;
            }[];
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string | null;
                rating: number;
                comment: string | null;
            }[];
            couponUsages: {
                id: string;
                customerProfileId: string | null;
                couponId: string;
                usedAt: Date;
            }[];
            orders: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                notes: string | null;
                orderNumber: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
                totalAmount: import("@prisma/client/runtime/library").Decimal;
                shippingCost: import("@prisma/client/runtime/library").Decimal;
                taxAmount: import("@prisma/client/runtime/library").Decimal;
                discountAmount: import("@prisma/client/runtime/library").Decimal;
                shippingAddressId: string | null;
                trackingID: string | null;
                customerProfileId: string | null;
            }[];
            cart: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string | null;
                customerProfileId: string | null;
                quantity: number | null;
            }[];
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createCustomerProfile(userId: string, data: UpdateCustomerProfileDto, profilePicture?: Express.Multer.File): Promise<{
        id: string;
        name: string | null;
        phone: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        landmark: string | null;
        postalCode: string | null;
        country: string | null;
        profilePicture: string | null;
        userId: string;
    }>;
    updateCustomerProfile(userId: string, data: UpdateCustomerProfileDto): Promise<{
        id: string;
        name: string | null;
        phone: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        landmark: string | null;
        postalCode: string | null;
        country: string | null;
        profilePicture: string | null;
        userId: string;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
        password: string | null;
    }>;
}
