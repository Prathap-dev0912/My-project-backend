import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Types } from 'mongoose';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createorder(
    @Body('propertyname') propertyname: string,
    @Body('tokens') tokens: number,
    @Body('price') price: number,
    @Body('status') status: string,
    @Body('currency') currency: string,
    @Body('country') country: string,
    @Body('code') code: string,
  ) {
    return this.ordersService.createOrder(
      propertyname,
      tokens,
      price,
      status,
      currency,
      country,
      code,
    );
  }

  @Get()
  getAllorders() {
    return this.ordersService.getAllorders();
  }

  @Get(':id')
  getorderbyId(@Param('id') id: string) {
    const objectId = new Types.ObjectId(id); // Convert string to ObjectId if necessary
    return this.ordersService.getorderbyId(objectId);
  }
}
