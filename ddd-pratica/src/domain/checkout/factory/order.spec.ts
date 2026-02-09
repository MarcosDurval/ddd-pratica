import OrderFactory from "./order";

describe("", () => {
  it("Should create an order", () => {
    const orderProps = {
      customerId: "123",
      items: [
        {
          productId: "1",
          name: "Product 1",
          price: 100,
          quantity: 2
        },
        {
          productId: "2",
          name: "Product 2",
          price: 200,
          quantity: 1
        }
      ]
    };
    const order = OrderFactory.create(orderProps);
    
    expect(order.id).toBeDefined();
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(2);
    expect(order.total()).toBe(400);
  });
  it("Should add products to order", () => {});

});