import { IsString } from 'class-validator';

export class CreateBankDetailsDto {
  @IsString()
  accountNumber: string;

  @IsString()
  accountHolderName: string;

  @IsString()
  ifscCode: string;

}

