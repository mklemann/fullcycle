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

    get name(): string {
        return this._name;
    }

    changeName(name: string) {
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

    set address(address: Address) {
        this._address = address;
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
