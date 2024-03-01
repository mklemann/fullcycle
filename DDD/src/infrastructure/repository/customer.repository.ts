import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.address.street,
            city: entity.address.city,
            state: entity.address.state,
            zip: entity.address.zip
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.address.street,
            city: entity.address.city,
            state: entity.address.state,
            zip: entity.address.zip
        }, {
            where: {
                id: entity.id
            }
        })
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map((customerModel) => {
            const customer = new Customer(customerModel.id, customerModel.name);
            const address = new Address(customerModel.street, customerModel.city, customerModel.state, customerModel.zip);
            customer.addRewardPoints(customerModel.rewardPoints);
            if (customerModel.active === true) {
                customer.activate();
            }
            customer.changeAddress(address);
            return customer;
        });
    }

    async find(id: string): Promise<Customer> {
        let customerModel
        try {
            customerModel = await CustomerModel.findOne({ where: { id: id }, rejectOnEmpty: true });
        } catch (e) {
            throw new Error(`Customer with id ${id} not found`);
        }

        const customer = new Customer(customerModel.id, customerModel.name);
        const address = new Address(customerModel.street, customerModel.city, customerModel.state, customerModel.zip);
        customer.changeAddress(address);

        return customer
    }

}