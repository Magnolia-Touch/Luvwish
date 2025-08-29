export declare enum SupportedCurrency {
    USD = "usd",
    INR = "inr",
    EUR = "eur"
}
export declare class CreatePaymentIntentDto {
    productId?: string;
    cartId?: string;
    quantity?: number;
    currency: SupportedCurrency;
}
