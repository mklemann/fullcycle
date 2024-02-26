"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_item_1 = __importDefault(require("./order-item"));
describe('Order unit test', () => {
    it('should throw error when quantity item equal zero', () => {
        expect(() => {
            new order_item_1.default("idOrder1", "item 1", 10, "id1", 0);
        }).toThrow("Qty must be greater than 0");
    });
});
