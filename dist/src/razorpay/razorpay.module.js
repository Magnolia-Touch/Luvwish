"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RazorpayModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const razorpay_controller_1 = require("./razorpay.controller");
const orders_module_1 = require("../orders/orders.module");
const orders_service_1 = require("../orders/orders.service");
const razorpay_service_1 = require("./razorpay.service");
let RazorpayModule = RazorpayModule_1 = class RazorpayModule {
    static forRootAsync() {
        return {
            module: RazorpayModule_1,
            controllers: [razorpay_controller_1.RazorpayController],
            imports: [config_1.ConfigModule.forRoot(), orders_module_1.OrdersModule],
            providers: [
                orders_service_1.OrdersService,
                razorpay_service_1.RazorpayService,
                {
                    provide: 'STRIPE_API_KEY',
                    useFactory: async (configService) => configService.get('STRIPE_API_KEY'),
                    inject: [config_1.ConfigService],
                },
            ],
        };
    }
};
exports.RazorpayModule = RazorpayModule;
exports.RazorpayModule = RazorpayModule = RazorpayModule_1 = __decorate([
    (0, common_1.Module)({})
], RazorpayModule);
//# sourceMappingURL=razorpay.module.js.map