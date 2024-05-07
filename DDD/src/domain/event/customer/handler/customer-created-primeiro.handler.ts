import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-address-changed.event";

export default class CustomerCreatedHandler1 implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent) {
        console.log('Esse é o primeiro console.log do evento: CustomerCreated');
    }
}