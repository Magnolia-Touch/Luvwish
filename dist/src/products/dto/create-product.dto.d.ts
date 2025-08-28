export declare class CreateProductImageDto {
    url: string;
    altText?: string;
    isMain?: boolean;
    sortOrder?: number;
}
export declare class CreateProductDto {
    name: string;
    categoryName: string;
    discountedPrice: number;
    actualPrice: number;
    stockCount: number;
    description?: string;
    isStock?: boolean;
    images?: CreateProductImageDto[];
}
