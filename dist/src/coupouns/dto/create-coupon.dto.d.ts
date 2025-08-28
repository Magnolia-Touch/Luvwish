import { CoupounValueType } from '@prisma/client';
export declare class CreateCouponDto {
    couponName: string;
    ValueType: CoupounValueType;
    Value: string;
    minimumSpent?: number;
    usedByCount?: number;
    usageLimitPerPerson?: number;
    validFrom: string;
    ValidTill: string;
}
