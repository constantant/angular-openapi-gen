import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_DELETE_AUTHORIZATION } from './apps-delete-authorization.token';

export function provideAppsDeleteAuthorizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_DELETE_AUTHORIZATION,
    'APPS_DELETE_AUTHORIZATION',
    initialBehavior,
  );
}
