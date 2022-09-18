import { Sequelize } from "sequelize-typescript";
import { Product } from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import { ProductRepository } from "./product.repository";

describe('Product Repository unit test', () => {

  //Criar conexao com Sequelize 
  let sequelize: Sequelize
  let product: Product
  let productModel: ProductModel
  const productRepository = new ProductRepository()

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: 'sqlite', 
      storage: ':memory:', //gravar em memory
      logging: false, 
      sync:  { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async() => {
    sequelize.close()
  })

  //criar um produto 
  it('should create a product ', async () => {
  
    product = new Product("1", "Product 1", 100)

    await productRepository.create(product)

    productModel = await ProductModel.findOne({
      where: {
        id: "1"
      }
    })

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1", 
      price: 100 
    })
    
  });

  it('should update a product', async () => {
    product = new Product("1", "Product 1", 100)
    await productRepository.create(product)

    product.changeName('Product 2')
    product.changePrice(10)

    await productRepository.update(product)

    productModel = await ProductModel.findOne({where: { id: "1"}})
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2", 
      price: 10 
    })
  });

  it('should find one product', async () => {
    product = new Product("1", "Product 1", 100)
    await productRepository.create(product)

    const foundProduct = await productRepository.find(product.id)
    productModel = await ProductModel.findOne({where:{id: product.id}})
    expect(productModel.toJSON()).toStrictEqual({
        id: foundProduct.id, name: foundProduct.name, price: foundProduct.price
    })
  });

  it('should find all products', async () => {
    const product1 = new Product("1", "Product 1", 100)
    const product2 = new Product("2", "Product 2", 200)

    await productRepository.create(product1)
    await productRepository.create(product2)

    const products = [product1, product2]
    const foundProducts = await productRepository.findAll()

    expect(products).toEqual(foundProducts)
  });
});