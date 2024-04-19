import { Module } from '@nestjs/common';
import { LightingModule } from './lighting/lighting.module';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { apiRoutes } from './api/api.routes';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...configuration],
    }),
    LightingModule,
    ApiModule,
    RouterModule.register([
      {
        path: '/api',
        module: ApiModule,
        children: apiRoutes,
      },
    ]),
  ],
})
export class AppModule {}
