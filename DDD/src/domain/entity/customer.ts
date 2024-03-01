import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address
    private _active: boolean = false
    private _rewardPoints: number = 0

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate()
    }

    validate() {
        if (this._id == null || this._id == "") {
            throw new Error("Id is required");
        }
        if (this._name == null || this._name == "") {
            throw new Error("Name is required");
        }
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get active(): boolean {
        return this._active
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) { 
        this._address = address;
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

    customerId() {
        return this._id;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

}
