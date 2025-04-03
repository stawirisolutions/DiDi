import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(private prisma: PrismaService) {}

  async findAllItems() {
    return this.prisma.orderItem.findMany();
  }

  async findItemsByOrder(orderId: string) {
    return this.prisma.orderItem.findMany({ where: { orderId } });
  }

  async deleteOrderItem(id: string) {
    return this.prisma.orderItem.delete({ where: { id } });
  }
}
