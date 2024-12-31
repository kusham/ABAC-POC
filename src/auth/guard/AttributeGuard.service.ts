// guards/attribute.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
//   import { KeycloakTokenParsed } from 'keycloak-connect';

@Injectable()
export class AttributeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAttributes = this.reflector.get<Record<string, any>>(
      'attributes',
      context.getHandler(),
    );

    if (!requiredAttributes) {
      return true; // No attributes required
    }

    const request = context.switchToHttp().getRequest();
    //   const user: KeycloakTokenParsed = request.user;
    const user = request.user;
    console.log('🚀 ~ AttributeGuard ~ canActivate ~ user:', user);

    if (!user) {
      return false; // User not authenticated or no attributes
    }

    // Check if the user has the required attributes
    return Object.entries(requiredAttributes).every(([key, value]) =>
      user[key]?.includes(value),
    );
  }
}
