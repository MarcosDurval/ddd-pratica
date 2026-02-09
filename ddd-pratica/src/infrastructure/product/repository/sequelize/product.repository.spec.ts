import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

/**
 * Test Suite: Product Repository
 * 
 * Objetivo: Validar a implementação dos métodos da classe ProductRepository
 * que implementa a interface abstrata RepositoryInterface<T>.
 * 
 * Métodos testados: create, update, find, findAll
 * 
 * Estratégia de teste: Utilizamos o Sequelize para persistir dados em um banco
 * de dados em memória (SQLite) e validamos que os métodos do repositório retornam
 * os mesmos dados que o Sequelize persiste, garantindo que a abstração funciona
 * corretamente como camada intermediária entre a entidade de domínio e a base de dados.
 */
describe("Product Repository", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);

    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const product = new Product("123", "Product 1", 100);
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "123" } });

    expect(productModel?.id).toBe("123");
    expect(productModel?.name).toBe("Product 1");
    expect(productModel?.price).toBe(100);
  });

  it("should update a product", async () => {
    const product = new Product("123", "Product 1", 100);
    const productRepository = new ProductRepository();
    await productRepository.create(product);
  
    const productToUpdate = await ProductModel.findOne( { where: { id: "123" } });

    expect(productToUpdate?.toJSON()).toStrictEqual({ id: "123", name: "Product 1", price: 100 });


    product.changeName("Updated Product");
    product.changePrice(150);
    await productRepository.update(product);

    const productModel = await ProductModel.findOne( { where: { id: "123" } } );

    expect(productModel?.toJSON()).toStrictEqual({ id: "123", name: "Updated Product", price: 150 });
  });

  it("should find a product", async () => {
    const product = new Product("123", "Product 1", 100);
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const productModel = await ProductModel.findOne( { where: { id: "123" } } );

    const productFound = await productRepository.find("123");

    expect(productModel?.toJSON()).toStrictEqual({ 
      id: productFound.id, 
      name: productFound.name, 
      price: productFound.price
    });
  });

  it("should throw error when product is not found", async () => {
    const productRepository = new ProductRepository();
    expect(async () => {
      await productRepository.find("999");
    }).rejects.toThrow("Product not found");
  });

  it("should find all products", async () => {
    const product1 = new Product("123", "Product 1", 100);
    const product2 = new Product("456", "Product 2", 200);
    const productRepository = new ProductRepository();
    await productRepository.create(product1);
    await productRepository.create(product2);

    const products = await productRepository.findAll();
    
    expect(products.length).toBe(2);
    expect(products).toContainEqual(
      expect.objectContaining({ id: "123", name: "Product 1", price: 100 })
    );
    expect(products).toContainEqual(
      expect.objectContaining({ id: "456", name: "Product 2", price: 200 })
    );
  });
});
