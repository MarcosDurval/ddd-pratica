import Customer from "../entity/customer";
import Address from "../entity/value-object/address";
import { v4 as uuid } from "uuid";

export default class CustomerFactory {
  static create(name: string) {
    return new Customer(uuid(), name);
  }

  static createCustomerWithAddress(name: string, address: Address) {
    const customer = new Customer(uuid(), name);
    const anddressObj = new Address(address.street, address.number, address.zipCode, address.city);
    customer.changeAddress(anddressObj);
    customer.canActivate();

    return customer;
  }
}