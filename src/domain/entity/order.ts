import OrderItem from './order-item';
export class Order{
  private _id: string;
  private _customerId: string;
  private _orderItems: OrderItem[];

  constructor(id: string, customerId: string, orderItems: OrderItem[]){
    this._id = id
    this._customerId = customerId
    this._orderItems = orderItems
    this.validate()
  }

  validate(): boolean{
    if(this._id.length === 0){
      throw new Error('Id is required')
    }

    if(this._customerId.length === 0){
      throw new Error('CustomerId is required')
    }

    if(this._orderItems.length === 0){
      throw new Error("Items are required")
    }

    return true
  }

  total(){
    return this._orderItems.reduce((acc, item) => acc + item.price, 0)
  }
}