import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ResponseModule } from 'src/response/response.module';

@Module({
  imports: [PrismaModule, ResponseModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
