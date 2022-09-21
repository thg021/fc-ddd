import { Product } from "../../../../domain/product/entity/product"
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface"
import ProductModel from "./product.model"

export class ProductRepository implements ProductRepositoryInterface{
  async create(entity: Product): Promise<void> {

    const {id, name,price } = entity

    await ProductModel.create({
      id, 
      name, 
      price
    })
  }
  async update(entity: Product): Promise<void> {
    const {id, name,price } = entity

    await ProductModel.update({id, name, price}, {where: { id }})
  }
  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({where: {id}})
    return new Product(productModel.id, productModel.name, productModel.price)
  }
  async findAll(): Promise<Product[]> {
    const productsModel = await ProductModel.findAll()

    return productsModel.map(product => {
      return new Product(product.id, product.name, product.price)
    })
  }
}