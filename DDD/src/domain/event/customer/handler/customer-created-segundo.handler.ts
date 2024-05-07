import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-address-changed.event";

export default class CustomerCreatedHandler2 implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent) {
        console.log('Esse é o segundo console.log do evento: CustomerCreated');
    }
}