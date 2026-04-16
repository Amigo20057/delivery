import { Update, Start, Ctx, Action } from 'nestjs-telegraf';
import { OrderService } from 'src/order/order.service';
import { Context } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(
    private readonly orderService: OrderService,
    private readonly botService: BotService,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    if (!ctx.message || !('text' in ctx.message)) return;
    const payload = ctx.message.text.split(' ')[1];
    if (!payload?.startsWith('order_')) return;
    if (!ctx.from?.id) {
      return await ctx.reply('❌ Не вдалось визначити ваш Telegram ID');
    }
    await this.orderService.attachTelegramUser(
      payload.replace('order_', ''),
      ctx.from.id,
    );
    await ctx.reply(
      `✅ Ви будете отримувати повідомлення по замовленню ${payload.replace('order_', '')}`,
    );
  }

  @Action(/confirm:(.+)/)
  async confirm(@Ctx() ctx: Context) {
    const orderId = (ctx as any).match[1];

    const order = await this.orderService.confirm(orderId);

    if (order.telegramUserId) {
      await this.botService.sendMessageToUser(
        order.telegramUserId,
        `✅ Ваше замовлення ${orderId} підтверджено`,
      );
    }

    await ctx.editMessageText(`✅ Замовлення ${orderId} підтверджено`);
  }

  @Action(/rejected:(.+)/)
  async rejected(@Ctx() ctx: Context) {
    const orderId = (ctx as any).match[1];
    console.log('REJECT CALLBACK', orderId);

    const order = await this.orderService.rejected(orderId);
    console.log('ORDER AFTER REJECT', order);

    if (order.telegramUserId) {
      console.log('Sending message to user', order.telegramUserId);
      await this.botService.sendMessageToUser(
        order.telegramUserId,
        `❌ Ваше замовлення ${orderId} відхилено`,
      );
    } else {
      console.log('No telegramUserId, cannot notify');
    }

    await ctx.editMessageText(`❌ Замовлення ${orderId} відхилено`);
  }
}
