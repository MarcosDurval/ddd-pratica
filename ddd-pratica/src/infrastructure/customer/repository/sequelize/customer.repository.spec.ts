import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/entity/value-object/address";
import customer from "../../../../domain/customer/entity/customer";


describe("Customer repository", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    // Add models to sequelize
    await sequelize.sync();
    // Setup code before each test
  });
  
  afterEach(async () => {
    // Teardown code after each test
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", "46", "12345-678", "City 1");
    customer.changeAddress(address);
  
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "123",
      name: "Customer 1",
      street: "Street 1",
      number: "46",
      zipCode: "12345-678",
      city: "City 1",
      active: false,
      rewardPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", "46", "12345-678", "City 1");
    customer.changeAddress(address);
  
    await customerRepository.create(customer);

    customer.changeName("Updated Customer");
    const newAddress = new Address("Updated Street", "99", "98765-432", "New City");
    customer.changeAddress(newAddress);
    customer.canActivate();

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "123",
      name: "Updated Customer",
      street: "Updated Street",
      number: "99",
      zipCode: "98765-432",
      city: "New City",
      active: true,
      rewardPoints: 0,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", "46", "12345-678", "City 1");
    customer.changeAddress(address);
    customer.canActivate();
  
    await customerRepository.create(customer);

    const customerFound = await customerRepository.find("123");

    expect(customerFound).toStrictEqual(customer);
  });

  it("should find customer not found", () => {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("456");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", "46", "12345-678", "City 1");
    customer1.changeAddress(address1);

    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", "99", "98765-432", "City 2");
    customer2.changeAddress(address2);
    customer2.canActivate();
    customer2.addRewardPoints(10);

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});