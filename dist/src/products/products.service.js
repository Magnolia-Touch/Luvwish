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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pagination_response_dto_1 = require("../pagination/pagination-response.dto");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        const { images, ...productData } = createProductDto;
        return this.prisma.product.create({
            data: {
                ...productData,
                images: images?.length
                    ? {
                        create: images.map((img) => ({
                            url: img.url,
                            altText: img.altText,
                            isMain: img.isMain ?? false,
                            sortOrder: img.sortOrder ?? 0,
                        })),
                    }
                    : undefined,
            },
            include: { images: true },
        });
    }
    async findAll(pagination) {
        const [data, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                include: { images: true },
                orderBy: { createdAt: 'desc' },
                skip: pagination.skip,
                take: pagination.limit,
            }),
            this.prisma.product.count(),
        ]);
        return new pagination_response_dto_1.PaginationResponseDto(data, total, pagination.page, pagination.limit);
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { images: true },
        });
        if (!product)
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        return product;
    }
    async update(id, updateProductDto) {
        const { images, ...productData } = updateProductDto;
        return this.prisma.product.update({
            where: { id },
            data: {
                ...productData,
                ...(images
                    ? {
                        images: {
                            deleteMany: {},
                            create: images.map((img) => ({
                                url: img.url,
                                altText: img.altText,
                                isMain: img.isMain ?? false,
                                sortOrder: img.sortOrder ?? 0,
                            })),
                        },
                    }
                    : {}),
            },
            include: { images: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.product.delete({ where: { id } });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map