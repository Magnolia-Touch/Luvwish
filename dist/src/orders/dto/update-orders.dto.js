"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_orders_dto_1 = require("./create-orders.dto");
class UpdateOrderDto extends (0, mapped_types_1.PartialType)(create_orders_dto_1.CreateOrderDto) {
}
exports.UpdateOrderDto = UpdateOrderDto;
//# sourceMappingURL=update-orders.dto.js.map