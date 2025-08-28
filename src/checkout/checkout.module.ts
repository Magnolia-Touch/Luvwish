import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CheckOutController } from './checkout.controller';
import { CheckOutService } from './checkout.service';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';



@Module({})
export class CheckOutModule {
  static forRootAsync(): DynamicModule {
    return {
      module: CheckOutModule,
      controllers: [CheckOutController],
      imports: [ConfigModule.forRoot(), OrdersModule],
      providers: [
        OrdersService,
        CheckOutService,
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
