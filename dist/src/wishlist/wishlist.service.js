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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pagination_response_dto_1 = require("../pagination/pagination-response.dto");
let WishlistService = class WishlistService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addToWishlist(dto, userId) {
        const { productId } = dto;
        const product = await this.prisma.product.findFirst({
            where: { id: productId, isStock: true },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found or inactive');
        }
        const customerProfile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!customerProfile) {
            throw new common_1.NotFoundException('Customer profile not found');
        }
        try {
            return await this.prisma.wishlist.create({
                data: {
                    customerProfileId: customerProfile.id,
                    productId,
                },
                include: { product: true },
            });
        }
        catch (err) {
            if (err.code === 'P2002') {
                throw new common_1.ConflictException('Product already exists in wishlist');
            }
            throw err;
        }
    }
    async getWishlist(userId, pagination) {
        const customerProfile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!customerProfile) {
            throw new common_1.NotFoundException('Customer profile not found');
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.wishlist.findMany({
                where: { customerProfileId: customerProfile.id },
                include: { product: true },
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.wishlist.count({
                where: { customerProfileId: customerProfile.id },
            }),
        ]);
        return new pagination_response_dto_1.PaginationResponseDto(data, total, pagination.page, pagination.limit);
    }
    async removeFromWishlist(id, userId) {
        const customerProfile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!customerProfile) {
            throw new common_1.NotFoundException('Customer profile not found');
        }
        const item = await this.prisma.wishlist.findFirst({
            where: { id, customerProfileId: customerProfile.id },
        });
        if (!item)
            throw new common_1.NotFoundException('Wishlist item not found');
        return this.prisma.wishlist.delete({
            where: { id },
        });
    }
    async clearWishlist(userId) {
        const customerProfile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!customerProfile) {
            throw new common_1.NotFoundException('Customer profile not found');
        }
        return this.prisma.wishlist.deleteMany({
            where: { customerProfileId: customerProfile.id },
        });
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map