import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from './customer.repository';
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderItem from "../../domain/entity/order-item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "Santos", "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "Santos", "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        let orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const orderRepository = new OrderRepository()
        const order = new Order("123", "123", [orderItem])
        await orderRepository.create(order)

        let findOrder = await OrderModel.findOne({
            where: { id: order.id }, include: ["items"],
        })

        expect(findOrder.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });

        orderItem = new OrderItem("1", product.name, product.price, product.id, 5)
        order.updateItems([orderItem])

        await orderRepository.update(order)

        findOrder = await OrderModel.findOne({
            where: { id: order.id }, include: ["items"]
        })

        expect(findOrder.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        })

    })

    it("should return an order by id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "Santos", "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            1
        );

        const orderRepository = new OrderRepository();
        const order = new Order("123", "123", [orderItem]);

        await orderRepository.create(order);

        const orderById = await orderRepository.find(order.id)

        expect(order).toStrictEqual(orderById)
    })


    it("shoould throw an error when order is not found", async () => {
        const orderRespoitory = new OrderRepository()

        expect(orderRespoitory.find("NOT_FOUND_ID")).rejects.toThrowError("Order with id NOT_FOUND_ID not found")
    })

    it("should return all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "Santos", "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            1
        );

        const orderItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            1
        );

        const orderRepository = new OrderRepository();
        const order = new Order("order1", "123", [orderItem]);
        const order2 = new Order("order2", "123", [orderItem2]);

        await orderRepository.create(order);
        await orderRepository.create(order2);   

        const orders = [order, order2]
        const orderById = await orderRepository.findAll()

        expect(orders).toStrictEqual(orderById)
    })

});