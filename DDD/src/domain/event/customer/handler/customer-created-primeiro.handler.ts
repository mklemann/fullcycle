import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class CustomerCreatedHandler1 implements EventHandlerInterface {
    handle(event: any) {
        console.log('Esse é o primeiro console.log do evento: CustomerCreated');
    }
}