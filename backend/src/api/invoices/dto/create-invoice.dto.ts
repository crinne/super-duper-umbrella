import { IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsString()
  label: string;

  @IsNumber()
  expire: number;
}
