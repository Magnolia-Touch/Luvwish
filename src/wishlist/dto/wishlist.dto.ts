import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}

export class UpdateWishlistDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
