import { Injectable } from '@nestjs/common';
import {
  Invoice,
  InvoiceResponse,
} from 'src/lighting/interface/invoice-response.interface';
import { LightingService } from 'src/lighting/lighting.service';

@Injectable()
export class InvoiceService {
  private previousInvoices: Invoice[] = [];

  constructor(private readonly lightingService: LightingService) {}

  async fetchInvoices(): Promise<any> {
    const { invoices } =
      await this.lightingService.sendRpcRequest<InvoiceResponse>(
        'listinvoices',
      );
    const changedInvoices = this.getChangedInvoices(invoices);
    if (changedInvoices.length === 0) {
      return null;
    }
    this.previousInvoices = invoices;
    return changedInvoices;
  }

  private getChangedInvoices(newInvoices: Invoice[]): Invoice[] {
    const changedInvoices: Invoice[] = [];
    newInvoices.forEach((newInvoice) => {
      const previousInvoice = this.previousInvoices.find(
        (prev) => prev.label === newInvoice.label,
      );
      if (!previousInvoice || previousInvoice.status !== newInvoice.status) {
        changedInvoices.push(newInvoice);
      }
    });

    return changedInvoices;
  }
}
