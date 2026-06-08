import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_UNLOCK_REPO_FOR_AUTHENTICATED_USER } from './migrations-unlock-repo-for-authenticated-user.token';

export function provideMigrationsUnlockRepoForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_UNLOCK_REPO_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_UNLOCK_REPO_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
