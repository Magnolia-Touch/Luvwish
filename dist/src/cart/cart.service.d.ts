import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart-item.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    addToCart(userId: string, addToCartDto: AddToCartDto): Promise<{
        message: string;
        cartItem: any;
    }>;
    getCart(userId: string): Promise<({
        product: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        customerProfileId: string | null;
        quantity: number;
    })[]>;
    updateCartItem(userId: string, cartItemId: string, updateCartDto: UpdateCartDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        customerProfileId: string | null;
        quantity: number;
    }>;
    removeFromCart(userId: string, cartItemId: string): Promise<{
        message: string;
    }>;
}
