import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class CustomerAddressChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.customer_id}, ${event.eventData.customer_name} alterado para: ${event.eventData.address.street}`)
    }
}