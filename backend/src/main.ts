import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors(configService.get('cors', { infer: true }));
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('app.port', { infer: true });

  await app.listen(port);
}
bootstrap();
