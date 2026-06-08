import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_LIST_REPOS_FOR_AUTHENTICATED_USER } from './migrations-list-repos-for-authenticated-user.token';
import type { MigrationsListReposForAuthenticatedUserResponse } from './migrations-list-repos-for-authenticated-user.token';

export function provideMigrationsListReposForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsListReposForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_LIST_REPOS_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_LIST_REPOS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
