import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";
/*
SendEmailWhenProductIsCreatedHandler é um EventHandler que será responsável por enviar um email quando um produto for criado. 
Ele implementa a interface EventHandlerInterface, que define o método handler para lidar com o evento ProductCreatedEvent.
No método handler, ele simplesmente imprime uma mensagem no console indicando que um email foi enviado para o produto criado.
*/


export default class SendEmailWhenProductIsCreatedHandler 
implements EventHandlerInterface<ProductCreatedEvent> {
  handler(event: ProductCreatedEvent): void {
    console.log(`Send email to ... ${event.eventData.name}`);
  }
}