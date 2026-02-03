import "reflect-metadata";
import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

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