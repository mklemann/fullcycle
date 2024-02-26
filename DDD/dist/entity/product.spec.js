"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe('Product unit test', () => {
    it('should throw error when id is empty', () => {
        expect(() => new product_1.default("", "Product 1", 100)).toThrowError("Id is required");
    });
    it('should throw error when name is empty', () => {
        expect(() => new product_1.default("123", "", 100)).toThrowError("Name is required");
    });
    it('should throw error when price need to be greater than 0 and not null', () => {
        expect(() => new product_1.default("123", "Product 1", -10)).toThrowError("Price need to be greater than 0 and not null");
    });
    it('should change name', () => {
        const product = new product_1.default("123", "Product 1", 100);
        expect(product.name).toBe("Product 1");
        // product.name = "Product 2";
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });
    it('should change price', () => {
        const product = new product_1.default("123", "Product 1", 100);
        expect(product.price).toBe(100);
        // product.name = "Product 2";
        product.changePrice(230);
        expect(product.price).toBe(230);
    });
});
