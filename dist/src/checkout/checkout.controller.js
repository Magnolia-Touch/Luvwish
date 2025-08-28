"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckOutController = void 0;
const common_1 = require("@nestjs/common");
const checkout_service_1 = require("./checkout.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let CheckOutController = class CheckOutController {
    constructor(checkoutService) {
        this.checkoutService = checkoutService;
    }
    async createPaymentIntent(body, productId, quantity, cartId, req) {
        const user = req.user.id;
        return this.checkoutService.createPaymentIntent(user, productId, quantity, cartId);
    }
    async refundPayment(body) {
        return this.checkoutService.refundPayment(body.paymentIntentId);
    }
    async createPaymentLink(body) {
        return this.checkoutService.createPaymentLink(body.priceId);
    }
};
exports.CheckOutController = CheckOutController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create-intent'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('productId')),
    __param(2, (0, common_1.Query)('quantity')),
    __param(3, (0, common_1.Query)('cartId')),
    __param(4, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, String, Object]),
    __metadata("design:returntype", Promise)
], CheckOutController.prototype, "createPaymentIntent", null);
__decorate([
    (0, common_1.Post)('refunds'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CheckOutController.prototype, "refundPayment", null);
__decorate([
    (0, common_1.Post)('payment-links'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CheckOutController.prototype, "createPaymentLink", null);
exports.CheckOutController = CheckOutController = __decorate([
    (0, common_1.Controller)('stripe'),
    __metadata("design:paramtypes", [checkout_service_1.CheckOutService])
], CheckOutController);
//# sourceMappingURL=checkout.controller.js.map