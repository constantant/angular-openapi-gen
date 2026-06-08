import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_LIST_FOR_AUTHENTICATED_USER } from './migrations-list-for-authenticated-user.token';
import type { MigrationsListForAuthenticatedUserResponse } from './migrations-list-for-authenticated-user.token';

export function provideMigrationsListForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsListForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_LIST_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_LIST_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
