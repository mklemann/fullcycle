import Address from './address';
import Customer from './customer';
describe('Customer unit test', () => {

    it('should throw error when id is empty', () => {
        expect(() => new Customer("", "John Doe")).toThrowError("Id is required");
    })

    it('should throw error when name is empty', () => {
        expect(() => new Customer("1", "")).toThrowError("Name is required");
    })

    it('should change name', () => {
        const customer = new Customer("1", "John Doe");
        customer.changeName("John");
        expect(customer.name).toBe("John");
    })

    it('should activate customer', () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("Rua S", "Santos", "SP", "11223344");
        customer.changeAddress(address)

        customer.activate();

        expect(customer.isActive()).toBe(true);
    })

    it('should deactivate customer', () => {
        const customer = new Customer("1", "John Doe");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    })

    it('should throw error when address is undefined when you deactivate a customer', () => {
        expect(
            () => {
                const customer = new Customer("1", "John Doe");
                customer.activate();        
            }
        ).toThrowError("Address is required")
    })

    it('should add reward points', () => {
        const customer = new Customer("1", "John Doe");
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPoints(100)
        expect(customer.rewardPoints).toBe(100)

        customer.addRewardPoints(100)
        expect(customer.rewardPoints).toBe(200)
    })

})