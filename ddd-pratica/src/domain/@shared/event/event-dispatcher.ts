import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

/* 
  classe responsável por gerenciar os eventos e seus manipuladores (handlers).
  Ela mantém um registro dos manipuladores de eventos para diferentes tipos de eventos e 
  fornece métodos para registrar, cancelar o registro e notificar os manipuladores quando um evento ocorre.
  EventHandlers são armazenados em um objeto onde a chave é o nome do evento e o valor é uma lista de manipuladores associados a esse evento.
*/ 

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
    
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if(!this.eventHandlers[eventName]) { return; }
    
    const eventIndex = this.eventHandlers[eventName].indexOf(eventHandler);
    if (eventIndex !== undefined && eventIndex > -1) {
      this.eventHandlers[eventName].splice(eventIndex, 1);
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
  
  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((handler) => {
        handler.handler(event);
      });
    }
    
  }
}