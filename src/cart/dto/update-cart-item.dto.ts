import { IsInt, Min, IsOptional, IsUUID } from 'class-validator';

export class UpdateCartDto {

  @IsUUID()
  productId: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;
}
