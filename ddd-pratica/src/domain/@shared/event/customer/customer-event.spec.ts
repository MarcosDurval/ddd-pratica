import Address from "../../../entity/address";
import Customer from "../../../entity/customer";
import EventDispatcher from "../../event-dispatcher";
import CustomerChangeAddressEvent from "./customer-change.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogWhenCustomerIsCreatedHandler from "./handler/send-console-log-when-customer-is-created.handler";
import SendEmailCustomerIsCreated from "./handler/send-email-customer-is-created.handler";
import SendEmailWhenAddressChangeHandler from "./handler/send-email-when-address-change.handler";

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

  it("should change address", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenAddressChangeHandler();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", "46", "Zipcode 1", "City 1");
    customer.changeAddress(address);
    const spyEventHandler = jest.spyOn(eventHandler, "handler");

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
    
    expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();

    expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]?.length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]?.[0]).toMatchObject(
      eventHandler
    );
    const customerChangeAddressEvent = new CustomerChangeAddressEvent({ id: customer.id, name: customer.name, address });
    eventDispatcher.notify(customerChangeAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
})