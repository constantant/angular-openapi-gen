import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_DELETE_CODESPACES_ACCESS_USERS } from './codespaces-delete-codespaces-access-users.token';

export function provideCodespacesDeleteCodespacesAccessUsersMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_DELETE_CODESPACES_ACCESS_USERS,
    'CODESPACES_DELETE_CODESPACES_ACCESS_USERS',
    initialBehavior,
  );
}
