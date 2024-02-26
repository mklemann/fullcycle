"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("./order"));
const order_item_1 = __importDefault(require("./order-item"));
describe('Order unit test', () => {
    it('should throw error when id is empty', () => {
        expect(() => new order_1.default("", "1", [])).toThrowError("Id is required");
    });
    it('should throw error when customer id is empty', () => {
        expect(() => new order_1.default("1", "", [])).toThrowError("Customer Id is required");
    });
    it('should throw error when order is empty', () => {
        expect(() => new order_1.default("123", "123", [])).toThrowError("To create order you need to add at least one item");
    });
    it('should calculate total of items', () => {
        const orderItem1 = new order_item_1.default("idOrder1", "item 1", 10, "id1", 1);
        const orderItem2 = new order_item_1.default("idOrder1", "item 2", 20, "id2", 2);
        const orderItem3 = new order_item_1.default("idOrder1", "item 3", 30, "id3", 3);
        const order = new order_1.default("orderId", "customerId", [orderItem1, orderItem2, orderItem3]);
        expect(order.total()).toBe(140);
    });
    it('should check if the qty is greater than 0', () => {
        // expect(order.total()).toBe(0)
        expect(() => {
            const orderItem1 = new order_item_1.default("idOrder1", "item 1", 10, "id1", 0);
            new order_1.default("orderId", "customerId", [orderItem1]);
        }).toThrow("Qty must be greater than 0");
    });
});
