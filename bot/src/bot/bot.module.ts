import { forwardRef, Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { OrderModule } from 'src/order/order.module';
import { BotUpdate } from './bot.update';

@Module({
  imports: [OrderModule, forwardRef(() => OrderModule)],
  providers: [BotUpdate, BotService],
  exports: [BotService],
})
export class BotModule {}
