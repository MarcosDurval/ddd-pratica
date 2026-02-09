import ProductFactory from "./product";

describe("Product Factory Unit Test", () => {

  it("Should create a product type a", () => {
      const product = ProductFactory.create("a", "Product 1", 100);

      expect(product.name).toBe("Product 1");
      expect(product.price).toBe(100);
      expect(product.id).toBeDefined();
  });

  it("Should create a product type b", () => {
      const product = ProductFactory.create("b", "Product 1", 100);

      expect(product.name).toBe("Product 1");
      expect(product.price).toBe(200);
      expect(product.id).toBeDefined();
  });

  it("Should trow error when type is not supported", () => {
    expect(() => {
      const product = ProductFactory.create("c", "Product 1", 100);
    }).toThrow("Product type not supported");
  });
});