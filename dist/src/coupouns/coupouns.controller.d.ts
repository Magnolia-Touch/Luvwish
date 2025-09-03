import { CouponService } from './coupouns.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { SearchFilterDto } from 'src/pagination/dto/search-filter.dto';
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    create(dto: CreateCouponDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        couponName: string;
        ValueType: import(".prisma/client").$Enums.CoupounValueType;
        Value: string;
        minimumSpent: import("@prisma/client/runtime/library").Decimal;
        usedByCount: number;
        usageLimitPerPerson: number;
        validFrom: string;
        ValidTill: string;
    }>;
    findAllCoupons(query?: SearchFilterDto): Promise<import("../pagination/pagination-response.dto").PaginationResponseDto<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        couponName: string;
        ValueType: import(".prisma/client").$Enums.CoupounValueType;
        Value: string;
        minimumSpent: import("@prisma/client/runtime/library").Decimal;
        usedByCount: number;
        usageLimitPerPerson: number;
        validFrom: string;
        ValidTill: string;
    }>>;
    findAllValidCoupons(query?: SearchFilterDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            couponName: string;
            ValueType: import(".prisma/client").$Enums.CoupounValueType;
            Value: string;
            minimumSpent: import("@prisma/client/runtime/library").Decimal;
            usedByCount: number;
            usageLimitPerPerson: number;
            validFrom: string;
            ValidTill: string;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        couponName: string;
        ValueType: import(".prisma/client").$Enums.CoupounValueType;
        Value: string;
        minimumSpent: import("@prisma/client/runtime/library").Decimal;
        usedByCount: number;
        usageLimitPerPerson: number;
        validFrom: string;
        ValidTill: string;
    }>;
    update(id: string, dto: UpdateCouponDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        couponName: string;
        ValueType: import(".prisma/client").$Enums.CoupounValueType;
        Value: string;
        minimumSpent: import("@prisma/client/runtime/library").Decimal;
        usedByCount: number;
        usageLimitPerPerson: number;
        validFrom: string;
        ValidTill: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        couponName: string;
        ValueType: import(".prisma/client").$Enums.CoupounValueType;
        Value: string;
        minimumSpent: import("@prisma/client/runtime/library").Decimal;
        usedByCount: number;
        usageLimitPerPerson: number;
        validFrom: string;
        ValidTill: string;
    }>;
    findApplicableCoupons(req: any): Promise<any[]>;
    applyCoupon(coupoun_id: string, req: any): Promise<{
        message: string;
        discount: number;
        status: import("@nestjs/common").HttpStatus;
    }>;
}
