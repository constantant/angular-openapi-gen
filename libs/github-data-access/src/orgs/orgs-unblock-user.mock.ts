import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_UNBLOCK_USER } from './orgs-unblock-user.token';

export function provideOrgsUnblockUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UNBLOCK_USER,
    'ORGS_UNBLOCK_USER',
    initialBehavior,
  );
}
