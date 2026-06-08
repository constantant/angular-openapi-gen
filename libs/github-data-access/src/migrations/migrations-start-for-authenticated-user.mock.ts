import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_START_FOR_AUTHENTICATED_USER } from './migrations-start-for-authenticated-user.token';
import type { MigrationsStartForAuthenticatedUserResponse } from './migrations-start-for-authenticated-user.token';

export function provideMigrationsStartForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsStartForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_START_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_START_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
