import type Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import type OrderItem from "../entity/order_item";
import { v4 as uuid} from "uuid";

export default class OrderService {
  
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }
    const order = new Order(uuid(), customer.id, items);
    const rewardPoints = order.total() / 2;
    customer.addRewardPoints(rewardPoints);
    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}