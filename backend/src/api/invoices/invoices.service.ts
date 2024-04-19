import { Injectable } from '@nestjs/common';
import {
  Invoice,
  InvoiceResponse,
} from 'src/lighting/interface/invoice-response.interface';
import { LightingService } from 'src/lighting/lighting.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private lightingService: LightingService) {}

  async getInvoices(): Promise<Invoice[]> {
    try {
      const response =
        await this.lightingService.sendRpcRequest<InvoiceResponse>(
          'listinvoices',
        );
      return response.invoices.reverse();
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  async createInvoise(
    createInvoiceDto: CreateInvoiceDto,
  ): Promise<InvoiceResponse> {
    try {
      return await this.lightingService.sendRpcRequest<InvoiceResponse>(
        'invoice',
        [
          createInvoiceDto.amount,
          createInvoiceDto.label,
          createInvoiceDto.description,
          createInvoiceDto.expire,
        ],
      );
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}
