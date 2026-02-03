import OrderItem from "./order_item";
describe("OrderItem Unit Test", () => {

  it("Should throw error when id is empty", () => {
expect(() => { new OrderItem("", "item 1", 100, "1", 1) }).toThrow("Id is required");
  });

  it("Should throw error when name is empty", () => {
    expect(() => { new OrderItem("1", "", 100, "1", 1) }).toThrow("Name is required");
  });

  it("Should throw error when price is less than or equal to zero", () => {
    expect(() => { new OrderItem("1", "item 1", 0, "1", 1) }).toThrow("Price must be greater than zero");
  });

  it("Should throw error when productId is empty", () => {
    expect(() => { new OrderItem("1", "item 1", 100, "", 1) }).toThrow("ProductId is required");
  });

  it("Should throw error when quantity is less than or equal to zero", () => {
    expect(() => { new OrderItem("1", "item 1", 100, "1", 0) }).toThrow("Quantity must be greater than zero");
  });
  it("Should create an order item successfully", () => {
    const orderItem = new OrderItem("1", "item 1", 100, "1", 2);
    expect(orderItem.quantity).toBe(2);
    expect(orderItem.price).toBe(200);
  });
});