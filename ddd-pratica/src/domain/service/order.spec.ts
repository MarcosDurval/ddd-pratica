import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderSerivice from "./order";

describe("Order service tests", () => {
  it("should place an order and calculate reward points", () => {
    const item1 = new OrderItem("item1", "Item 1", 10, "p1", 1);
    const item2 = new OrderItem("item2", "Item 2", 20, "p2", 2);
    const customer = new Customer("c1", "Customer 1");

    const order = OrderSerivice.placeOrder(customer, [item1, item2]);

    expect(order.total()).toBe(50);
    expect(customer.rewardPoints).toBe(25);
  });
  
  it("should get total of all orders", () => {
    const item1 = new OrderItem("item1", "Item 1", 10, "p1", 1);
    const item2 = new OrderItem("item2", "Item 2", 20, "p2", 2);
    
    const order = new Order("order1", "customer1", [item1]);
    const order2 = new Order("order1", "customer1", [item2]);


    const total = OrderSerivice.total([order, order2]);
    expect(total).toBe(50);
  });

  it("should throw error when placing order with no items", () => {
    const customer = new Customer("c1", "Customer 1");
    expect(() => {
      OrderSerivice.placeOrder(customer, []);
    }).toThrow("Order must have at least one item");
  });
});