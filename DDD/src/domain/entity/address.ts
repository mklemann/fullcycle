export default class Address {
    _street: string;
    _city: string;
    _state: string;
    _zip: string;

    constructor(street: string, city: string, state: string, zip: string) {
        this._street = street;
        this._city = city;
        this._state = state;
        this._zip = zip;

        this.validate()
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

    addressString(): string {
        return `${this._street}, ${this._city}, ${this._state}, ${this._zip}`
    }

    findZip(): string {
        return this._zip
    }

    get street(): string {
        return this._street;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zip(): string {
        return this._zip;
    }
}