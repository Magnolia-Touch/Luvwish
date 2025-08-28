"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    constructor(prisma, usersService, jwtService) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user)
            return null;
        if (!user.password) {
            throw new common_1.UnauthorizedException('Invalid login method');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return null;
        const { password: _, ...result } = user;
        return result;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return this.generateToken(user);
    }
    async registeruser(registerDto) {
        const { email } = registerDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
        }
        const user = await this.usersService.createCustomer({ ...registerDto });
        if (registerDto.password) {
            return this.generateToken(user);
        }
        else {
            return await this.generateOtp(email);
        }
    }
    async registeradmin(registerDto) {
        const { email } = registerDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
        }
        const user = await this.usersService.createAdmin({ ...registerDto });
        if (registerDto.password) {
            return this.generateToken(user);
        }
        else {
            return await this.generateOtp(email);
        }
    }
    async generateToken(user) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    async generateOtp(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return { message: 'Not a registered user' };
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 15);
        await this.prisma.userOtp.upsert({
            where: { userId: user.id },
            update: { otp, expiresAt: expiry },
            create: {
                userId: user.id,
                otp,
                expiresAt: expiry,
            },
        });
        if (process.env.NODE_ENV !== 'production') {
            return {
                message: 'OTP generated (development mode)',
                otp,
            };
        }
        return { message: 'OTP sent to your email' };
    }
    async validateOtp(email, otp) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const userOtp = await this.prisma.userOtp.findUnique({
            where: { userId: user.id },
        });
        if (!userOtp || userOtp.otp !== otp) {
            throw new common_1.UnauthorizedException('Invalid OTP');
        }
        if (new Date() > userOtp.expiresAt) {
            throw new common_1.UnauthorizedException('OTP has expired');
        }
        await this.prisma.userOtp.delete({ where: { userId: user.id } });
        return this.generateToken(user);
    }
    async getAdminProfile(id, role) {
        if (role !== client_1.Roles.ADMIN) {
            throw new common_1.ForbiddenException('Profile cannot be accessed');
        }
        return this.usersService.AdminProfile(id);
    }
    async getCustomerProfile(id, role) {
        if (role === client_1.Roles.DELIVERY) {
            throw new common_1.ForbiddenException('Profile cannot be accessed');
        }
        return this.usersService.CutomerProfile(id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map