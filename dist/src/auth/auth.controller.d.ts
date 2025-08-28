import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OtpVerifyDto } from './dto/otp-verify.dto';
import { EmailDto } from './dto/email.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateCustomerProfileDto } from 'src/users/dto/update-customer-profile.dto';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
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
    registerAdmin(registerDto: RegisterDto): Promise<{
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
    generateOtp(emailDto: EmailDto): Promise<{
        message: string;
        otp?: undefined;
    } | {
        message: string;
        otp: string;
    }>;
    verifyOtp(otpVerifyDto: OtpVerifyDto): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    getAdminProfile(req: any): Promise<{
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
    getCustomerProfile(req: any): Promise<{
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
    createProfile(req: any, data: UpdateCustomerProfileDto, image?: Express.Multer.File): Promise<{
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
    updateProfile(req: any, data: UpdateCustomerProfileDto, image?: Express.Multer.File): Promise<{
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
    changePassword(req: any, dto: ChangePasswordDto): Promise<{
        email: string;
        password: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
