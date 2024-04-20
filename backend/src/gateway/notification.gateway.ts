import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server } from 'socket.io';
import { Invoice } from 'src/lighting/interface/invoice-response.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class InvoiceNotificationGateway {
  @WebSocketServer()
  server: Server;

  async emitInvoices(invoices: Invoice[]) {
    this.server.emit('invoices', invoices);
  }
}
