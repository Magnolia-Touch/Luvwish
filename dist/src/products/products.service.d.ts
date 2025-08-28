import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        images: {
            id: string;
            productId: string;
            url: string;
            altText: string | null;
            isMain: boolean;
            sortOrder: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryName: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        stockCount: number;
        description: string | null;
        isStock: boolean;
    }>;
    findAll(pagination: PaginationDto): Promise<PaginationResponseDto<{
        images: {
            id: string;
            productId: string;
            url: string;
            altText: string | null;
            isMain: boolean;
            sortOrder: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryName: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        stockCount: number;
        description: string | null;
        isStock: boolean;
    }>>;
    findOne(id: string): Promise<{
        images: {
            id: string;
            productId: string;
            url: string;
            altText: string | null;
            isMain: boolean;
            sortOrder: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryName: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        stockCount: number;
        description: string | null;
        isStock: boolean;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        images: {
            id: string;
            productId: string;
            url: string;
            altText: string | null;
            isMain: boolean;
            sortOrder: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryName: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        stockCount: number;
        description: string | null;
        isStock: boolean;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryName: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        stockCount: number;
        description: string | null;
        isStock: boolean;
    }>;
}
