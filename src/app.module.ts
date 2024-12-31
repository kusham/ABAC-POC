import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { AppController } from './app.controller';
import { KeyclockConfigModule } from './config/keyclock.config.module';
import { KeycloakConfigService } from './config/keycloak.config.service';
import { ProductModule } from './product/product.module';
import { AttributeGuard } from './auth/guard/AttributeGuard.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [KeyclockConfigModule],
    }),
    ProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AttributeGuard, // Register AttributeGuard globally
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
