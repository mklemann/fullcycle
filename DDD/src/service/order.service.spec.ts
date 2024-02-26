import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe('Order service unit tests', () => {

    it('should place an order', () => {
        const customer = new Customer("id1", "customer1");
        expect(customer.rewardPoints).toBe(0)

        const item1 = new OrderItem("id1", "Item 1", 100, "productId1", 1);

        const order = OrderService.placeOrder(customer, [item1])

        expect(customer.rewardPoints).toBe(50)
        expect(order.total()).toBe(100)
    })

    it('should add reward points', () => {
        const customer = new Customer("id1", "customer1");
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPoints(100)
        expect(customer.rewardPoints).toBe(100)

        customer.addRewardPoints(100)
        expect(customer.rewardPoints).toBe(200)
    })

    it('should calculate all orders', () => {
        const item1 = new OrderItem("id1", "Item 1", 100, "productId1", 1);
        const item2 = new OrderItem("id2", "Item 2", 200, "productId2", 2);

        const order1 = new Order("id1", "customer1", [item1]);

        const order2 = new Order("id2", "customer2", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);

    })
});