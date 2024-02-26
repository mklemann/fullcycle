import Address from "./entity/address";
import Customer from "./entity/customer";
import OrderItem from "./entity/order-item";
import Order from './entity/order';

const customer = new Customer("1", "John Doe");
const address = new Address("Rua Bartolomeu", "Santos", "SP", "11055-000");
const customerId = customer.customerId();
customer.activate()
customer.Address = address;

const orderItem1 = new OrderItem("1", "Item 1", 10);
const orderItem2 = new OrderItem("2", "Item 2", 20);

const order = new Order("1", customerId, [orderItem1, orderItem2])

console.log(customer)