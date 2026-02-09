import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repostiory";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "../../../product/repository/sequelize/product.model";
import Customer from "../../../../domain/customer/entity/customer";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Address from "../../../../domain/customer/entity/value-object/address";

describe("order repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      CustomerModel,
      OrderModel, 
      OrderItemModel, 
      ProductModel
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    const product = new Product("p1", "Product 1", 100);
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", "123", "12345-678", "City 1");
    customer.changeAddress(address);
    const productRepository = new ProductRepository();
    const customerRepository = new CustomerRepository();

    await productRepository.create(product);
    await customerRepository.create(customer);

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderModel).toBeDefined();
    expect(orderModel?.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "c1",
      total: order.total(),
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 200,
          product_id: "p1",
          quantity: 2,
          unitPrice: 100,
          order_id: "1",
        },
      ],
    });
  });
  it("should update an order", async () => {
    const product = new Product("p1", "Product 1", 100);
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", "123", "12345-678", "City 1");
    customer.changeAddress(address);
    const productRepository = new ProductRepository();
    const customerRepository = new CustomerRepository();

    await productRepository.create(product);
    await customerRepository.create(customer);
    
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // Update order: change quantity of existing item and add a new item

    const updatedOrderItem = new OrderItem("1", product.name, product.price, product.id, 3);
    const newProduct = new Product("p2", "Product 2", 200);
    await productRepository.create(newProduct);
    const newOrderItem = new OrderItem("2", newProduct.name, newProduct.price, newProduct.id, 1);
    const updatedOrder = new Order("1", customer.id, [updatedOrderItem, newOrderItem]);
    await orderRepository.update(updatedOrder);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderModel).toBeDefined();
    expect(orderModel?.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "c1",
      total: updatedOrder.total(),
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 300,
          product_id: "p1",
          quantity: 3,
          unitPrice: 100,
          order_id: "1",
        },
        {
          id: "2",
          name: "Product 2",
          price: 200,
          product_id: "p2",
          quantity: 1,
          unitPrice: 200,
          order_id: "1",
        },
      ],
    });
  });

  it("should find an order", async () => {
    const product1 = new Product("p1", "Product 1", 100);
    const product2 = new Product("p2", "Product 2", 200);
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", "123", "12345-678", "City 1");
    customer.changeAddress(address);
    const productRepository = new ProductRepository();
    const customerRepository = new CustomerRepository();

    await productRepository.create(product1);
    await productRepository.create(product2);
    await customerRepository.create(customer);
    
    const orderItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 2);
    const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 1);
    const order = new Order("1", customer.id, [orderItem1, orderItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const orderFound = await orderRepository.find(order.id);


    expect(orderFound.total()).toBe(400);
    expect(orderFound).toBeDefined();
    expect({
      id: orderFound.id,
      customerId: orderFound.customerId,
      total: orderFound.total(),
      items: orderFound.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
      })),
    }).toStrictEqual({
      id: "1",
      customerId: "c1",
      total: 400,
      items: [{
        id: "1",
        name: "Product 1",
        price: 200,
        productId: "p1",
        quantity: 2,
      },
      {
        id: "2",
        name: "Product 2",
        price: 200,
        productId: "p2",
        quantity: 1,
      }
    ],
    });
  });

  it("should throw error when order is not found", async () => {
    const orderRepository = new OrderRepository();
    expect(async () => {
      await orderRepository.find("999");
    }).rejects.toThrow("Order not found");
  });

  it("should find all orders", async () => {
    const product1 = new Product("p1", "Product 1", 100);
    const product2 = new Product("p2", "Product 2", 200);
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", "123", "12345-678", "City 1");
    customer.changeAddress(address);
    const productRepository = new ProductRepository();
    const customerRepository = new CustomerRepository();

    await productRepository.create(product1);
    await productRepository.create(product2);
    await customerRepository.create(customer);
    
    const orderItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 2);
    const order1 = new Order("1", customer.id, [orderItem1]);
    const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 1);
    const order2 = new Order("2", customer.id, [orderItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders.length).toBe(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});