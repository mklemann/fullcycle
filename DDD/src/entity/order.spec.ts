import Order from "./order";
import OrderItem from './order-item';

describe('Order unit test', () => {

    it('should throw error when id is empty', () => {
        expect(() => new Order("", "1", [])).toThrowError("Id is required");
    })

    it('should throw error when customer id is empty', () => {
        expect(() => new Order("1", "", [])).toThrowError("Customer Id is required");
    })

    it('should throw error when order is empty', () => {
        expect(() => new Order("123", "123", [])).toThrowError("To create order you need to add at least one item");
    })

    it('should calculate total of items', () => {
        const orderItem1 = new OrderItem("idOrder1", "item 1", 10, "id1", 1)
        const orderItem2 = new OrderItem("idOrder1", "item 2", 20, "id2", 2)
        const orderItem3 = new OrderItem("idOrder1", "item 3", 30, "id3", 3)

        const order = new Order("orderId", "customerId", [orderItem1, orderItem2, orderItem3])

        expect(order.total()).toBe(140)
    })

    it('should check if the qty is greater than 0', () => {

        // expect(order.total()).toBe(0)

        expect(() => {
            const orderItem1 = new OrderItem("idOrder1", "item 1", 10, "id1", 0)
            new Order("orderId", "customerId", [orderItem1])
        }).toThrow("Qty must be greater than 0")

    })

})