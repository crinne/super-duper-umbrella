import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { LightingModule } from 'src/lighting/lighting.module';

@Module({
  imports: [LightingModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [],
})
export class InvoicesModule {}
