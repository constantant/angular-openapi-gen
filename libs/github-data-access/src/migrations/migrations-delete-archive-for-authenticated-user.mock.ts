import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_DELETE_ARCHIVE_FOR_AUTHENTICATED_USER } from './migrations-delete-archive-for-authenticated-user.token';

export function provideMigrationsDeleteArchiveForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_DELETE_ARCHIVE_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_DELETE_ARCHIVE_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
