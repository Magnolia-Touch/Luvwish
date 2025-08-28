import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { CoupounValueType } from '@prisma/client';



export class CreateCouponDto {
  @IsString()
  couponName: string;

  @IsEnum(CoupounValueType)
  ValueType: CoupounValueType

  @IsString()
  Value: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  minimumSpent?: number = 0;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  usedByCount?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  usageLimitPerPerson?: number = 1;

  @IsString()
  validFrom: string;

  @IsString()
  ValidTill: string;

}
