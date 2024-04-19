import { Module } from '@nestjs/common';
import { LightingService } from './lighting.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [LightingService],
  exports: [LightingService],
})
export class LightingModule {}
