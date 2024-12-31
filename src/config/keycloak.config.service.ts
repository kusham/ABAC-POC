import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private configService: ConfigService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL'),
      realm: this.configService.get<string>('KEYCLOAK_REALM'),
      clientId: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
      secret: this.configService.get<string>('KEYCLOAK_SECRET'),
      cookieKey: this.configService.get<string>('KEYCLOAK_COOKIE_KEY'),
      logLevels: this.configService.get<LogLevel[]>('KEYCLOAK_LOG_LEVELS'),
      useNestLogger: this.configService.get<boolean>(
        'KEYCLOAK_USE_NEST_LOGGER',
      ),
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE, 
    };
  }
}
