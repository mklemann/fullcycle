"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./entity/address"));
const customer_1 = __importDefault(require("./entity/customer"));
const order_item_1 = __importDefault(require("./entity/order-item"));
const order_1 = __importDefault(require("./entity/order"));
const customer = new customer_1.default("1", "John Doe");
const address = new address_1.default("Rua Bartolomeu", "Santos", "SP", "11055-000");
const customerId = customer.customerId();
customer.activate();
customer.Address = address;
const orderItem1 = new order_item_1.default("1", "Item 1", 10);
const orderItem2 = new order_item_1.default("2", "Item 2", 20);
const order = new order_1.default("1", customerId, [orderItem1, orderItem2]);
console.log(customer);
