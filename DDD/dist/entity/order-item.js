"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, name, price, productId, quantity) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }
    validate() {
        if (this._id == null || this._id == "") {
            throw new Error("Id is required");
        }
        if (this._quantity <= 0) {
            throw new Error("Qty must be greater than 0");
        }
        return true;
    }
    get quantity() {
        return this._quantity;
    }
    get price() {
        return this._price * this._quantity;
    }
}
exports.default = OrderItem;
