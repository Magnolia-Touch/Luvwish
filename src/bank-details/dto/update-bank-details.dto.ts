import { PartialType } from '@nestjs/mapped-types';
import { CreateBankDetailsDto } from './create-bank-details.dto';

export class UpdateBankDetailsDto extends PartialType(CreateBankDetailsDto) { }
