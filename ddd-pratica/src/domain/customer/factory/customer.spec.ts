import Address from "../entity/value-object/address";
import CustomerFactory from "./customer";

describe("CustomerFactory", () => {
  it("Should create a customer", () => {
    const customer = CustomerFactory.create("John Doe");

    expect(customer.name).toBe("John Doe");
    expect(customer.id).toBeDefined();
  });

  it("Should create a customer with address", () => {
    const address = new Address("Main St", "46", "12345", "Metropolis");
    const customer = CustomerFactory.createCustomerWithAddress("John Doe", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.Address?.city).toBe(address.city);
    expect(customer.Address?.street).toBe(address.street);
    expect(customer.Address?.number).toBe(address.number);
    expect(customer.Address?.zipCode).toBe(address.zipCode);  
    expect(customer.isActive()).toBe(true);
  });
});