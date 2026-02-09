import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogWhenCustomerIsCreatedHandler from "./handler/send-console-log-when-customer-is-created.handler";
import SendEmailCustomerIsCreated from "./handler/send-email-customer-is-created.handler";

describe("Domain events tests", () => {
  it("Should create a customer created event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogWhenCustomerIsCreatedHandler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.[0]).toMatchObject(
      eventHandler
    );
  })

  it("Should notify customer created event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendEmailCustomerIsCreated();
    const spyEventHandler = jest.spyOn(eventHandler, "handler");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handler");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.[0]).toMatchObject(
      eventHandler
    );
    const customerCreatedEvent = new CustomerCreatedEvent({ id: "123", name: "Customer 1" })

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("Should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendEmailCustomerIsCreated();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.length).toBe(2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.[0]).toMatchObject(
      eventHandler2
    );
  });

  it("Should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendEmailCustomerIsCreated();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.length).toBe(2);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.length).toBeUndefined();
  });
})