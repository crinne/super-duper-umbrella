import { Module } from '@nestjs/common';
import { LightingModule } from 'src/lighting/lighting.module';
import { InvoiceNotificationGateway } from './notification.gateway';
import { SchedulerService } from './scheduler.service';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [LightingModule],
  providers: [InvoiceNotificationGateway, SchedulerService, InvoiceService],
})
export class GatewayModule {}
