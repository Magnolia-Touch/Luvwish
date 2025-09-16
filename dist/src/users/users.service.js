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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const client_1 = require("@prisma/client");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCustomer(createUserDto) {
        const { email, password } = createUserDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser)
            throw new common_1.ConflictException('Email already in use');
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: client_1.Roles.CUSTOMER,
                CustomerProfile: {
                    create: {}
                }
            },
            include: { CustomerProfile: true },
        });
        const { password: _, ...result } = user;
        const cart = await this.prisma.cartItem.create({
            data: {
                customerProfileId: user.CustomerProfile.id
            },
        });
        const wishlist = await this.prisma.wishlist.create({
            data: {
                customerProfileId: user.CustomerProfile.id,
            },
        });
        return result;
    }
    async createAdmin(createUserDto) {
        const { email, password } = createUserDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser)
            throw new common_1.ConflictException('Email already in use');
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: client_1.Roles.ADMIN,
                AdminProfile: {
                    create: {}
                }
            },
        });
        const { password: _, ...result } = user;
        return result;
    }
    async findAll(role) {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
            where: role ? { role: role } : {},
            orderBy: { createdAt: 'desc' },
        });
    }
    async CutomerProfile(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                CustomerProfile: {
                    select: {
                        name: true,
                        address: true,
                        city: true,
                        state: true,
                        country: true,
                        postalCode: true,
                        phone: true,
                        profilePicture: true,
                        addresses: true,
                        reviews: true,
                        couponUsages: true,
                        orders: true,
                        cart: true,
                    },
                },
            },
        });
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        return user;
    }
    async AdminProfile(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                AdminProfile: {
                    select: {
                        name: true,
                        profilePicture: true,
                        notes: true,
                        phone: true,
                    },
                },
            },
        });
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        return user;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                CustomerProfile: {
                    select: {
                        phone: true,
                        profilePicture: true,
                        addresses: true,
                        reviews: true,
                        couponUsages: true,
                        orders: true,
                        cart: true,
                    },
                },
            },
        });
    }
    async remove(id) {
        await this.CutomerProfile(id);
        await this.prisma.user.delete({ where: { id } });
        return { message: `User with ID ${id} deleted successfully` };
    }
    async createCustomerProfile(userId, data, profilePicture) {
        const { name, phone, address, city, state, postalCode, country } = data;
        const profilepic = profilePicture ? profilePicture.path : '';
        return this.prisma.customerProfile.create({
            data: {
                user: { connect: { id: userId } },
                name: name || '',
                phone: phone || '',
                address: address || '',
                city: city || '',
                state: state || '',
                postalCode: postalCode || '',
                country: country || '',
                profilePicture: profilepic || '',
            },
        });
    }
    async updateCustomerProfile(userId, data) {
        const { name, phone, address, city, state, postalCode, country, profilePicture } = data;
        const profile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!profile) {
            throw new common_1.NotFoundException(`CustomerProfile for user ${userId} not found`);
        }
        return this.prisma.customerProfile.update({
            where: { userId },
            data: {
                name: name ?? profile.name,
                phone: phone ?? profile.phone,
                address: address ?? profile.address,
                city: city ?? profile.city,
                state: state ?? profile.state,
                postalCode: postalCode ?? profile.postalCode,
                country: country ?? profile.country,
                profilePicture: profilePicture ?? profile.profilePicture,
            },
        });
    }
    async changePassword(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!user.password) {
            throw new common_1.BadRequestException('User has no password set');
        }
        const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException('Old password is incorrect');
        }
        const hashed = await bcrypt.hash(dto.newPassword, 10);
        return this.prisma.user.update({
            where: { id: userId },
            data: { password: hashed },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map