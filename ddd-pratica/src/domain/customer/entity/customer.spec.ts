import Address from "./value-object/address";
import Customer from "../entity/customer";


describe("Customer Entity Test", () => {
  const customerId = "123";
  const customerName = "John Doe";
  it("Should throw error when id is empty", () => {
    expect(() => {
        const customer = new Customer("", customerName);
    }).toThrow("Id is required");
  });

  it("Should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer(customerId, "");
    }).toThrow("Name is required");
  });

  it("Should create a customer", () => {
    const customer = new Customer(customerId, customerName);
    expect(customer.id).toBe(customerId);
    expect(customer.name).toBe(customerName);
    expect(customer.isActive()).toBe(false);
  });

  it("Should change name", () => {
    const customer = new Customer(customerId, customerName);
    const newName = "Jane Doe";
    customer.changeName(newName);
    expect(customer.name).toBe(newName);
  });

  it("Should throw error when activate customer without address", () => {
    expect(() => {
      const customer = new Customer(customerId, customerName);
      customer.canActivate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("Should activate customer", () => {
    const customer = new Customer(customerId, customerName);
    const address = new Address("Main St", "46", "12345", "Metropolis");
    customer.changeAddress(address);
    customer.canActivate();
    expect(customer.isActive()).toBe(true);
  });

  it("Should deactivate customer", () => {
    const customer = new Customer(customerId, customerName);
    const address = new Address("Main St", "46", "12345", "Metropolis");
    customer.changeAddress(address);
    customer.canActivate();

    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("Should add reward points", () => {
    const customer = new Customer(customerId, customerName);
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });

  it("Should address to customer", () => {
    const customer = new Customer(customerId, customerName);
    const address = new Address("Main St", "46", "12345", "Metropolis");
    customer.changeAddress(address);
    expect(customer.getAddress()).toBe("Main St, 46, 12345 Metropolis");
  });

  it("Should return null address when address is not set", () => {
    const customer = new Customer(customerId, customerName);
    expect(customer.getAddress()).toBeNull();
  });

  it("Should validate address zip code format", () => {
    expect(() => {
      new Address("Main St", "46", "", "Metropolis");
    }).toThrow("Zip code is required");
  });

  it("Should validate address street format", () => {
    expect(() => {
      new Address("", "46", "12345", "Metropolis");
    }).toThrow("Street is required");
  });

  it("Should validate address city format", () => {
    expect(() => {
      new Address("Main St", "46", "12345", "");
    }).toThrow("City is required");
  });

  it("Should validate address number format", () => {
    expect(() => {
      new Address("Main St", "", "12345", "Metropolis");
    }).toThrow("Number is required");
  });
});