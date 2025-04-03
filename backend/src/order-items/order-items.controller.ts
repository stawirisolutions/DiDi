import { Controller, Get, Param, Delete } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private orderItemsService: OrderItemsService) {}

  @Get()
  findAllItems() {
    return this.orderItemsService.findAllItems();
  }

  @Get('order/:orderId')
  findItemsByOrder(@Param('orderId') orderId: string) {
    return this.orderItemsService.findItemsByOrder(orderId);
  }

  @Delete(':id')
  deleteOrderItem(@Param('id') id: string) {
    return this.orderItemsService.deleteOrderItem(id);
  }
}
