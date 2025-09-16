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
    getCustomerProfile(req: any): Promise<{
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
    createProfile(req: any, data: UpdateCustomerProfileDto): Promise<{
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
    updateProfile(req: any, data: UpdateCustomerProfileDto): Promise<{
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
    changePassword(req: any, dto: ChangePasswordDto): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
        password: string | null;
    }>;
}
