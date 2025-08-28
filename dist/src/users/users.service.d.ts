import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCustomer(createUserDto: CreateUserDto): Promise<{
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createAdmin(createUserDto: CreateUserDto): Promise<{
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(role?: string): Promise<{
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    CutomerProfile(id: string): Promise<{
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
        CustomerProfile: {
            address: string;
            name: string;
            phone: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            profilePicture: string;
            addresses: {
                address: string;
                name: string;
                phone: string | null;
                city: string;
                state: string;
                postalCode: string;
                country: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                isDefault: boolean;
            }[];
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                productId: string;
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
                customerProfileId: string | null;
                orderNumber: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
                totalAmount: import("@prisma/client/runtime/library").Decimal;
                shippingCost: import("@prisma/client/runtime/library").Decimal;
                taxAmount: import("@prisma/client/runtime/library").Decimal;
                discountAmount: import("@prisma/client/runtime/library").Decimal;
                shippingAddressId: string | null;
                trackingID: string | null;
            }[];
            cart: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                productId: string;
                quantity: number;
            }[];
        };
    }>;
    AdminProfile(id: string): Promise<{
        email: string;
        id: string;
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
                address: string;
                name: string;
                phone: string | null;
                city: string;
                state: string;
                postalCode: string;
                country: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                isDefault: boolean;
            }[];
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                productId: string;
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
                customerProfileId: string | null;
                orderNumber: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
                totalAmount: import("@prisma/client/runtime/library").Decimal;
                shippingCost: import("@prisma/client/runtime/library").Decimal;
                taxAmount: import("@prisma/client/runtime/library").Decimal;
                discountAmount: import("@prisma/client/runtime/library").Decimal;
                shippingAddressId: string | null;
                trackingID: string | null;
            }[];
            cart: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                productId: string;
                quantity: number;
            }[];
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createCustomerProfile(userId: string, data: UpdateCustomerProfileDto, profilePicture?: Express.Multer.File): Promise<{
        address: string;
        name: string;
        phone: string | null;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        profilePicture: string | null;
        id: string;
        userId: string;
    }>;
    updateCustomerProfile(userId: string, data: UpdateCustomerProfileDto, profilePicture?: Express.Multer.File): Promise<{
        address: string;
        name: string;
        phone: string | null;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        profilePicture: string | null;
        id: string;
        userId: string;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        email: string;
        password: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
