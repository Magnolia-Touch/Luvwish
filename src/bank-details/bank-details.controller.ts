import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BankDetailsService } from './bank-details.service';
import { CreateBankDetailsDto } from './dto/create-bank-details.dto';
import { UpdateBankDetailsDto } from './dto/update-bank-details.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('bank-details')
export class BankDetailsController {
  constructor(private readonly bankDetailsService: BankDetailsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBankDetailsDto: CreateBankDetailsDto,
    @Request() req: any,
  ) {
    return this.bankDetailsService.create(createBankDetailsDto, req.user.id);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.bankDetailsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.bankDetailsService.findOne(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateBankDetailsDto: UpdateBankDetailsDto,
  ) {
    return this.bankDetailsService.update(req.user.id, id, updateBankDetailsDto);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.bankDetailsService.remove(req.user.id, id);
  }
}
