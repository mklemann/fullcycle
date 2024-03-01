
export default class Product {

    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate()
    }

    validate(): boolean {
        if (this._id == null || this._id == "") {
            throw new Error("Id is required");
        }

        if (this._name == null || this._name == "") {
            throw new Error("Name is required");
        }

        if (this._price == null || this._price <= 0) {
            throw new Error("Price need to be greater than 0 and not null");
        };

        return true;
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changePrice(price: number): void {
        this._price = price;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get id(): string { 
        return this._id;
    }

    set name(name: string) {
        this._name = name;
    }

    set price(price: number) {
        this._price = price;
    }

}
