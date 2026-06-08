import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_SET_CODESPACES_ACCESS_USERS } from './codespaces-set-codespaces-access-users.token';

export function provideCodespacesSetCodespacesAccessUsersMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_SET_CODESPACES_ACCESS_USERS,
    'CODESPACES_SET_CODESPACES_ACCESS_USERS',
    initialBehavior,
  );
}
