import { Op } from "sequelize";
import OrderModel from "../db/sequelize/db/order.model";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/db/order-item.model";
import OrderItem from "../../domain/entity/order_item";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          unitPrice: item.unitPrice,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [OrderItemModel],
      },
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.sequelize!.transaction(async (t) => {
      await OrderModel.update(
        { customer_id: entity.customerId, total: entity.total() },
        { where: { id: entity.id }, transaction: t },
      );

      const itemIds = entity.items.map((item) => item.id);
      await OrderItemModel.destroy({
        where: { order_id: entity.id, id: { [Op.notIn]: itemIds } },
        transaction: t,
      });

      await OrderItemModel.bulkCreate(
        entity.items.map((item) => ({
          id: item.id,
          order_id: entity.id,
          name: item.name,
          price: item.price,
          unitPrice: item.unitPrice,
          product_id: item.productId,
          quantity: item.quantity,
        })),
        {
          updateOnDuplicate: [
            "name",
            "price",
            "quantity",
            "unitPrice",
            "product_id",
          ],
          transaction: t,
        },
      );
    });
  }

  async find(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: { id },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });

      const orderItems = orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.unitPrice,
            item.product_id,
            item.quantity,
          ),
      );

      return new Order(orderModel.id, orderModel.customer_id, orderItems);
    } catch (error) {
      throw new Error("Order not found");
    }
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.unitPrice,
            item.product_id,
            item.quantity,
          ),
      );

      return new Order(orderModel.id, orderModel.customer_id, orderItems);
    });
  }
}
