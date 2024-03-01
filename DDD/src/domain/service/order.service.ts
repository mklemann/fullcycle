import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import { v4 as uuid } from 'uuid';

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error("Items are required");
        }

        const order = new Order(uuid(), customer.customerId(), items);
        customer.addRewardPoints(order.total() / 2);

        return order
    }
}