import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RazorpayController } from './razorpay.controller';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';
import { RazorpayService } from './razorpay.service';



@Module({})
export class RazorpayModule {
  static forRootAsync(): DynamicModule {
    return {
      module: RazorpayModule,
      controllers: [RazorpayController],
      imports: [ConfigModule.forRoot(), OrdersModule],
      providers: [
        OrdersService,
        RazorpayService,
        {
          provide: 'STRIPE_API_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_API_KEY'),
          inject: [ConfigService],
        },
      ],
    };
  }
}
