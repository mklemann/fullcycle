import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from './customer.repository';
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe("Customer Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();

    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Rua X", "São Paulo", "SP", "12345-678")
        customer.changeAddress(address);

        await customerRepository.create(customer);
        
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: "Customer 1",
            active: customer.isActive(),
            rewardPoints: 0,
            street: "Rua X",
            city: "São Paulo",
            state: "SP",
            zip: "12345-678"
        })

    })

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Rua X", "São Paulo", "SP", "12345-678")
        customer.changeAddress(address);

        await customerRepository.create(customer);

        customer.changeName("Customer 2");

        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: "Customer 2",
            active: customer.isActive(),
            rewardPoints: 0,
            street: "Rua X",
            city: "São Paulo",
            state: "SP",
            zip: "12345-678"
        })
    })

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Rua X", "São Paulo", "SP", "12345-678")
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const findCustomer = await customerRepository.find("123");

        expect(customer).toStrictEqual(findCustomer)
    })

    it("shoould throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository()

        expect(customerRepository.find("NOT_FOUND_ID")).rejects.toThrowError("Customer with id NOT_FOUND_ID not found")
    })

    it("should find all customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Rua X", "São Paulo", "SP", "12345-678")
        customer.addRewardPoints(1000);
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customer2 = new Customer("1234", "Customer 2")
        const address2 = new Address("Rua X", "São Paulo", "SP", "12345-678")
        customer2.addRewardPoints(100);
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const findCustomer = await customerRepository.findAll();

        expect(findCustomer).toHaveLength(2)
        expect(findCustomer).toContainEqual(customer)
        expect(findCustomer).toContainEqual(customer2)
    })

})