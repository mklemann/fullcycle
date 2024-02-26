import OrderItem from './order-item';

describe('Order unit test', () => {
    it('should throw error when quantity item equal zero', () => {
        expect(() => {
            new OrderItem("idOrder1", "item 1", 10, "id1", 0)
        }).toThrow("Qty must be greater than 0")
    })
})