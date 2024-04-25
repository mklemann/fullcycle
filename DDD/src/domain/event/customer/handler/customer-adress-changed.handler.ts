import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class CustomerAddressChangedHandler implements EventHandlerInterface {
    handle(event: any): void {
        console.log(`Endereço do cliente: ${event.eventData.customer_id}, ${event.eventData.customer_name} alterado para: ${event.eventData.address.street}`)
    }
}