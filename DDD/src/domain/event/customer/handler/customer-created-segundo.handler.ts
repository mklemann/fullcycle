import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class CustomerCreatedHandler2 implements EventHandlerInterface {
    handle(event: any) {
        console.log('Esse é o segundo console.log do evento: CustomerCreated');
    }
}