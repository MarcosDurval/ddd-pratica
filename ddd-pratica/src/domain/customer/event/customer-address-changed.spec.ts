import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../entity/value-object/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import SendEmailWhenAddressChangeHandler from "./handler/send-email-when-address-change.handler";

describe("Customer changes event tests", () => {
  it("should change address", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenAddressChangeHandler();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", "46", "Zipcode 1", "City 1");
    customer.changeAddress(address);
    const spyEventHandler = jest.spyOn(eventHandler, "handler");

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]?.length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]?.[0]).toMatchObject(
      eventHandler
    );

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({ id: customer.id, name: customer.name, address });

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  } );
})