"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, city, state, zip) {
        this._street = street;
        this._city = city;
        this._state = state;
        this._zip = zip;
        this.validate();
    }
    validate() {
        if (this._street == null || this._street == "") {
            throw new Error("Street is required");
        }
        if (this._city == null || this._city == "") {
            throw new Error("City is required");
        }
        if (this._state == null || this._state == "") {
            throw new Error("State is required");
        }
        if (this._zip == null || this._zip == "") {
            throw new Error("Zip is required");
        }
    }
    addressString() {
        return `${this._street}, ${this._city}, ${this._state}, ${this._zip}`;
    }
}
exports.default = Address;
