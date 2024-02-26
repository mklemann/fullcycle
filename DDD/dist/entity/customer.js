"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._active = false;
        this._id = id;
        this._name = name;
        this.validate();
    }
    validate() {
        if (this._id == null || this._id == "") {
            throw new Error("Id is required");
        }
        if (this._name == null || this._name == "") {
            throw new Error("Name is required");
        }
    }
    get name() {
        return this._name;
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        if (this._address === undefined) {
            throw new Error("Address is required");
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    isActive() {
        return this._active;
    }
    set address(address) {
        this._address = address;
    }
    customerId() {
        return this._id;
    }
}
exports.default = Customer;
