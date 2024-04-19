import { InvoicesModule } from './invoices/invoices.module';

export const apiRoutes = [
  {
    path: '/invoice',
    module: InvoicesModule,
  },
];
