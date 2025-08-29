import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchFilterDto } from 'src/pagination/dto/search-filter.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        images: {
            id: string;
            url: string;
            altText: string | null;
            isMain: boolean;
            sortOrder: number;
            productId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        categoryName: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        stockCount: number;
        isStock: boolean;
    }>;
    findAll(query: SearchFilterDto): Promise<import("../pagination/pagination-response.dto").PaginationResponseDto<{
        images: {
            id: string;
            url: string;
            altText: string | null;
            isMain: boolean;
            sortOrder: number;
            productId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        categoryName: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        stockCount: number;
        isStock: boolean;
    }>>;
    findOne(id: string): Promise<{
        images: {
            id: string;
            url: string;
            altText: string | null;
            isMain: boolean;
            sortOrder: number;
            productId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        categoryName: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        stockCount: number;
        isStock: boolean;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        images: {
            id: string;
            url: string;
            altText: string | null;
            isMain: boolean;
            sortOrder: number;
            productId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        categoryName: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        stockCount: number;
        isStock: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        categoryName: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        stockCount: number;
        isStock: boolean;
    }>;
}
