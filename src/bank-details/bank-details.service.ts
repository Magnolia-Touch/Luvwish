import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBankDetailsDto } from './dto/create-bank-details.dto';
import { UpdateBankDetailsDto } from './dto/update-bank-details.dto';
@Injectable()
export class BankDetailsService {
  constructor(private prisma: PrismaService) { }

  async create(createBankDetailsDto: CreateBankDetailsDto, profile_id: string) {
    const profile = await this.prisma.customerProfile.findUnique({
      where: { userId: profile_id },
    });
    if (!profile) {
      throw new NotFoundException('CustomerProfile Not Found');
    }
    return this.prisma.bankDetails.create({
      data: { ...createBankDetailsDto, customerProfileId: profile.id },
    });
  }

  async findAll(profile_id: string) {
    const profile = await this.prisma.customerProfile.findUnique({
      where: { userId: profile_id },
    });
    if (!profile) {
      throw new NotFoundException('CustomerProfile Not Found');
    }
    return this.prisma.bankDetails.findMany({
      where: { customerProfileId: profile.id },
      // orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(profile_id: string, id: string) {
    const profile = await this.prisma.customerProfile.findUnique({
      where: { userId: profile_id },
    });
    if (!profile) {
      throw new NotFoundException('CustomerProfile Not Found');
    }
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address)
      throw new NotFoundException(`Address with id ${id} not found`);
    if (address.customerProfileId !== profile.id) {
      throw new ForbiddenException(
        'You are not allowed to access this address',
      );
    }
    return address;
  }

  async update(profileId: string, id: string, dto: UpdateBankDetailsDto) {
    const profile = await this.prisma.customerProfile.findUnique({
      where: { userId: profileId },
    });
    if (!profile) {
      throw new NotFoundException('CustomerProfile Not Found');
    }
    const bank_details = await this.prisma.bankDetails.findUnique({ where: { id } });
    if (!bank_details)
      throw new NotFoundException(`BankDetails with id ${id} not found`);
    if (bank_details.customerProfileId !== profile.id) {
      throw new ForbiddenException(
        'You are not allowed to access this bank details',
      );
    }
    return this.prisma.bankDetails.update({
      where: { id },
      data: dto,
    });
  }

  async remove(profile_id: string, id: string) {
    const profile = await this.prisma.customerProfile.findUnique({
      where: { userId: profile_id },
    });
    if (!profile) {
      throw new NotFoundException('CustomerProfile Not Found');
    }
    await this.findOne(profile.id, id); // ensure belongs to profile
    return this.prisma.bankDetails.delete({
      where: { id },
    });
  }
}
