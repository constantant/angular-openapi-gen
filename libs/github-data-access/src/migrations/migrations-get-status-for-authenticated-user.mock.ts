import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_GET_STATUS_FOR_AUTHENTICATED_USER } from './migrations-get-status-for-authenticated-user.token';
import type { MigrationsGetStatusForAuthenticatedUserResponse } from './migrations-get-status-for-authenticated-user.token';

export function provideMigrationsGetStatusForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsGetStatusForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_GET_STATUS_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_GET_STATUS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
