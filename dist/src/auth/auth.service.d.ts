import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly usersService;
    private readonly jwtService;
    constructor(prisma: PrismaService, usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    registeruser(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    } | {
        message: string;
        otp?: undefined;
    } | {
        message: string;
        otp: string;
    }>;
    registeradmin(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    } | {
        message: string;
        otp?: undefined;
    } | {
        message: string;
        otp: string;
    }>;
    generateToken(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    generateOtp(email: string): Promise<{
        message: string;
        otp?: undefined;
    } | {
        message: string;
        otp: string;
    }>;
    validateOtp(email: string, otp: string): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    getAdminProfile(id: string, role: string): Promise<{
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
    getCustomerProfile(id: string, role: string): Promise<{
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
}
