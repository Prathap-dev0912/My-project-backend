import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schema/orderdetails';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private jwtService: JwtService,
  ) {}

  async createOrder(
    propertyname: string,
    tokens: number,
    price: number,
    status: string,
    currency: string,
    country: string,
    code: string,
  ) {
    const newOrder = new this.orderModel({
      propertyname,
      tokens,
      price,
      status,
      currency,
      country,
      code,
    });
    return await newOrder.save();
  }

  async getAllorders() {
    const orders = await this.orderModel.find();
    return orders;
  }
  async getorderbyId(id: any) {
    const order = await this.orderModel.findById(id);
    return order;
  }
}
