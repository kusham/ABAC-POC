import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'https://auth.dev.tdv.surge.tools/',
      realm: 'master',
      clientId: 'backend-ABAC-POC',
      secret: 'lZnDt3QEGty2RLG8lUweN8MMkxfBw1Af',
      cookieKey: 'KEYCLOAK_JWT',
      logLevels: ['verbose', 'error', 'warn'],
      useNestLogger: false,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
