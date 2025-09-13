import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(req: any, addToCartDto: AddToCartDto): Promise<{
        message: string;
        cartItem: any;
    }>;
    getCart(req: any): Promise<({
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
        productId: string | null;
        customerProfileId: string | null;
        quantity: number | null;
    })[]>;
    updateCart(req: any, cartItemId: string, updateCartDto: UpdateCartDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string | null;
        customerProfileId: string | null;
        quantity: number | null;
    }>;
    removeFromCart(req: any, cartItemId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string | null;
        customerProfileId: string | null;
        quantity: number | null;
    } | {
        message: string;
    }>;
}
