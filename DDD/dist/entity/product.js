"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(id, name, price) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }
    validate() {
        if (this._id == null || this._id == "") {
            throw new Error("Id is required");
        }
        if (this._name == null || this._name == "") {
            throw new Error("Name is required");
        }
        if (this._price == null || this._price <= 0) {
            throw new Error("Price need to be greater than 0 and not null");
        }
        ;
        return true;
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    changePrice(price) {
        this._price = price;
        this.validate();
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
}
exports.default = Product;
