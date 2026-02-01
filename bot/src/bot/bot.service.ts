import { Injectable } from '@nestjs/common';
import { Order } from 'generated/prisma/client';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  private readonly adminId = Number(process.env.ADMIN_TELEGRAM_ID);

  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  formatOrder(order: Order): string {
    const items = Array.isArray(order.items)
      ? order.items
      : JSON.parse(typeof order.items === 'string' ? order.items : '[]');

    return (
      `🆕 Новый заказ #${order.orderId}\n\n` +
      items.map((i: any) => `• ${i.productId} × ${i.qty}`).join('\n') +
      `\n\n👤 ${order.name ?? 'Без имени'}\n` +
      `📞 ${order.phone ?? '—'}\n` +
      `💬 ${order.comment ?? '—'}`
    );
  }

  async sendOrderToAdmin(order: Order) {
    await this.bot.telegram.sendMessage(this.adminId, this.formatOrder(order), {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '✅ Подтвердить',
              callback_data: `confirm:${order.orderId}`,
            },
            {
              text: '❌ Отказать',
              callback_data: `rejected:${order.orderId}`,
            },
          ],
        ],
      },
    });
  }

  async sendMessageToUser(chatId: number, text: string) {
    await this.bot.telegram.sendMessage(chatId, text);
  }
}
