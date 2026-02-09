import "reflect-metadata";
import Address from "./domain/customer/entity/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

const customer = new Customer("c1", "Customer 1");
const address = new Address("Street 1", "46", "12345-678", "City 1");
customer.changeAddress(address);

const item1 = new OrderItem("i1", "Item 1", 10, "p1", 2);
const item2 = new OrderItem("i2", "Item 2", 20, "p2", 1);

const order = new Order("o1", customer.id, [item1, item2]);

console.log("Customer:", customer);
console.log("Address:", customer.getAddress());
console.log("Order:", order);
console.log("Order Items:", order.total());