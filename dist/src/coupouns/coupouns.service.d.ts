import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { HttpStatus } from '@nestjs/common';
import { SearchFilterDto } from 'src/pagination/dto/search-filter.dto';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';
export declare class CouponService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findAllCoupons(query: SearchFilterDto): Promise<PaginationResponseDto<{
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
    findAllValidCoupons(query: {
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
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
    findApplicableCoupons(profile_id: string): Promise<any[]>;
    applyCoupon(profile_id: string, coupon_id: string, orderAmount?: number): Promise<{
        message: string;
        discount: number;
        status: HttpStatus;
    }>;
}
