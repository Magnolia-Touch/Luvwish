// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Patch,
  Request,
  UseInterceptors,
  UploadedFile,
  ForbiddenException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OtpVerifyDto } from './dto/otp-verify.dto';
import { EmailDto } from './dto/email.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateCustomerProfileDto } from 'src/users/dto/update-customer-profile.dto';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService,) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.registeruser(registerDto);
  }

  //need to make it only accessbile by admin
  @Post('register-admin')
  async registerAdmin(@Body() registerDto: RegisterDto) {
    return this.authService.registeradmin(registerDto);
  }

  @Post('otp/generate')
  async generateOtp(@Body() emailDto: EmailDto) {
    return this.authService.generateOtp(emailDto.email);
  }

  @Post('otp/verify')
  async verifyOtp(@Body() otpVerifyDto: OtpVerifyDto) {
    return this.authService.validateOtp(otpVerifyDto.email, otpVerifyDto.otp);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  async getAdminProfile(@Request() req) {
    const userId = req.user.id
    const role = req.user.role
    console.log(role)
    return this.authService.getAdminProfile(userId, role);
  }


  // 🔹 Customer profile
  @Get('customer/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("CUSTOMER", "ADMIN")
  async getCustomerProfile(@Request() req) {
    const userId = req.user.id
    const role = req.user.role
    return this.authService.getCustomerProfile(userId, role);
  }


  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @UseInterceptors(FileInterceptor('image'))
  async createProfile(
    @Request() req,
    @Body() data: UpdateCustomerProfileDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const userId = req.user.id;
    return this.userService.createCustomerProfile(userId, data, image);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @UseInterceptors(FileInterceptor('image'))
  async updateProfile(
    @Request() req,
    @Body() data: UpdateCustomerProfileDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const userId = req.user.id;
    return this.userService.updateCustomerProfile(userId, data, image);
  }


  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Request() req,
    @Body() dto: ChangePasswordDto,
  ) {
    const userId = req.user.id;
    return this.userService.changePassword(userId, dto);
  }

}
