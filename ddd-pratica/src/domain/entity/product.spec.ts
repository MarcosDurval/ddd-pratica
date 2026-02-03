import Product from "./product";

describe("Product Unit Test", () => {

  it("Should trow error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrow("Id is required");
  });

  it("Should trow error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrow("Name is required");
  });

  it("Should trow error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Product 1", -10);
    }).toThrow("Price must be greater than zero");
  });

  it("Should create a product successfully", () => {
    const product = new Product("123", "Product 1", 100);
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);
    expect(product.id).toBe("123");
  });

  it("Should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("New Product Name");
    expect(product.name).toBe("New Product Name");
  });
  it("Should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});