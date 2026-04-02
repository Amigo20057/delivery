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

    let total = 0;

    const itemsText = items
      .map((i: any) => {
        const itemTotal = i.price * i.count;
        total += itemTotal;

        return `• ${i.strMeal}  
  ${i.count} × ${i.price} грн = ${itemTotal} грн`;
      })
      .join('\n\n');

    return (
      `🆕 Нове замовлення #${order.orderId}\n\n` +
      `🍽 Склад замовлення:\n${itemsText}\n\n` +
      `💰 Разом: ${total} грн\n\n` +
      `👤 ${order.name ?? 'Без імені'}\n` +
      `📞 ${order.phone ?? '—'}\n` +
      `📍 ${order.address ?? '—'}\n` +
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
