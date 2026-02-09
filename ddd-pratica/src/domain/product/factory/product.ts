import Product from "../entity/product";
import ProductB from "../entity/productB";
import {v4 as uuid} from "uuid";

export default class ProductFactory {
  static create(type: string, name: string, price: number) {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
