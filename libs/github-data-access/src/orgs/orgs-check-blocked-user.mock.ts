import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CHECK_BLOCKED_USER } from './orgs-check-blocked-user.token';

export function provideOrgsCheckBlockedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CHECK_BLOCKED_USER,
    'ORGS_CHECK_BLOCKED_USER',
    initialBehavior,
  );
}
