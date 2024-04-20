import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoiceService } from './invoice.service';
import { InvoiceNotificationGateway } from './notification.gateway';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly invoiceGateway: InvoiceNotificationGateway,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  async fetchInvoices() {
    const invoices = await this.invoiceService.fetchInvoices();
    if (invoices !== null) {
      this.invoiceGateway.emitInvoices(invoices);
    }
  }
}
