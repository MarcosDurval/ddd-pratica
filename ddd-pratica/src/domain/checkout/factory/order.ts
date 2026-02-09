import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { v4 as uuid } from "uuid";

interface OrderProps {
  customerId: string;
  items: OrderItemProps[];
}

interface OrderItemProps {
  name: string;
  price: number;
  productId: string;
  quantity: number;
}

// Factory Pattern ao criar objetos complexos removendo a 
// complexidade da criação do objeto do cliente

export default class OrderFactory {
  static create(props: OrderProps) {
    const items = props.items.map(item => {
      return new OrderItem( 
        uuid(),
        item.name,
        item.price,
        item.productId,
        item.quantity
      );
    });

    return new Order(uuid(), props.customerId, items);
  }
}