import OrderItem from "./order-item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total()
        this.validate()
    }

    validate(): boolean {
        if (this._id == null || this._id == "") {
            throw new Error("Id is required");
        }

        if (this._customerId == null || this._customerId == "") {
            throw new Error("Customer Id is required");
        }

        if (this._items.length == 0) {
            throw new Error("To create order you need to add at least one item");
        }

        if (this._items.some((item) => item.quantity <= 0)) {
            throw new Error("Qty must be greater than 0")
        }

        return true
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    updateItems(items: OrderItem[]): void {
        this._items = items
        this._total = this.total()
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
}