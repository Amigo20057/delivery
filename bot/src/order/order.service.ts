import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { BotService } from 'src/bot/bot.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrderService {
  private readonly botName = 'delivery_bot_test_bot';

  constructor(
    @Inject('PRISMA') private readonly prisma: PrismaClient,
    private readonly botService: BotService,
  ) {}

  private generateOrderId(): string {
    return 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  }

  async create(dto: CreateOrderDto) {
    const orderId = this.generateOrderId();

    const order = await this.prisma.order.create({
      data: {
        orderId,
        items: dto.items,
        name: dto.name,
        phone: dto.phone,
        comment: dto.comment,
        address: dto.address,
      },
    });

    await this.botService.sendOrderToAdmin(order);

    return {
      orderId,
      telegramLink: `https://t.me/${this.botName}?start=order_${orderId}`,
    };
  }

  async attachTelegramUser(orderId: string, telegramUserId: number) {
    const order = await this.prisma.order.findUnique({
      where: { orderId },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.telegramUserId) {
      return order;
    }

    return this.prisma.order.update({
      where: { orderId },
      data: {
        telegramUserId,
      },
    });
  }

  async confirm(orderId: string) {
    return this.prisma.order.update({
      where: { orderId },
      data: { status: 'CONFIRMED' },
    });
  }

  async rejected(orderId: string) {
    return await this.prisma.order.update({
      where: { orderId },
      data: { status: 'REJECTED' },
    });
  }
}
