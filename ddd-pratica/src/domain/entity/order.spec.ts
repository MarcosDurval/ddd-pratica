import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit Test", () => {
  it("sould throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrow("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      const order = new Order("123", "123", []);
    }).toThrow("Items must be greater than zero");
  });

  it("should calculate total", () => {
    const orderItem = new OrderItem("1", "item 1", 100, "2", 2);
    const orderItem2 = new OrderItem("2", "item 2", 200, "3", 1);
    const order = new Order("123", "321", [orderItem, orderItem2]);

    expect(order.total()).toBe(400);
  });

  it("Should total price", () => {
    const orderItem1 = new OrderItem("1", "item 1", 100, "2", 2);
    const orderItem2 = new OrderItem("2", "item 2", 200, "3", 1);
    const order = new Order("123", "321", [orderItem1]);
    expect(order.totalPrice).toBe(200);

    const order2 = new Order("124", "321", [orderItem1, orderItem2]);
    expect(order2.totalPrice).toBe(400);
  })
});