import EventHandlerInterface from "../../../event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change.event";

export default class SendEmailWhenAddressChangeHandler 
implements EventHandlerInterface<CustomerChangeAddressEvent> {
  handler(event: CustomerChangeAddressEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} 
      alterado para: ${event.eventData.address.toString()}`,
    );
  }
}