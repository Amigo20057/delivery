import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BotModule,
    OrderModule,
    TelegrafModule.forRoot({ token: process.env.BOT_TOKEN! }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
