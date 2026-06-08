import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_GET_ARCHIVE_FOR_AUTHENTICATED_USER } from './migrations-get-archive-for-authenticated-user.token';

export function provideMigrationsGetArchiveForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_GET_ARCHIVE_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_GET_ARCHIVE_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
