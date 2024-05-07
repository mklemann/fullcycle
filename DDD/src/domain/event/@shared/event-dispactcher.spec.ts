import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import CustomerAddressChangedHandler from "../customer/handler/customer-adress-changed.handler";
import CustomerCreatedHandler1 from "../customer/handler/customer-created-primeiro.handler";
import CustomerCreatedHandler2 from "../customer/handler/customer-created-segundo.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe('Domain Events Tests', () => {

    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    })

    it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);
        eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);

    })

    it('should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBe(undefined)
    })

    it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHanler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'Product',
            price: 100,
        })

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHanler).toHaveBeenCalled()
    })

    it('should notify event when customer is created', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new CustomerCreatedHandler1();
        const eventHandler2 = new CustomerCreatedHandler2();
        const spyEventHanler1 = jest.spyOn(eventHandler1, 'handle');
        const spyEventHanler2 = jest.spyOn(eventHandler2, 'handle');

        eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: 'Customer',
            email: ''
        })

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHanler1).toHaveBeenCalled()
        expect(spyEventHanler2).toHaveBeenCalled()
    })

    it('should notify when customer address is changed', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new CustomerAddressChangedHandler()
        const spyEventHandler = jest.spyOn(eventHandler, 'handle')
        
        const customer = new Customer('1', 'Joao')
        const address = new Address('Rua', 'City', 'State', '11111111')
        customer.changeAddress(address)
        
        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            customer_id: customer.id,
            customer_name: customer.name,
            address: address
        })
        
        eventDispatcher.register('CustomerAddressChangedEvent', eventHandler)
        
        eventDispatcher.notify(customerAddressChangedEvent)

        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(eventHandler)
        expect(spyEventHandler).toHaveBeenCalled()

    })

})