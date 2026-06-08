import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_UNLOCK_REPO_FOR_ORG } from './migrations-unlock-repo-for-org.token';

export function provideMigrationsUnlockRepoForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_UNLOCK_REPO_FOR_ORG,
    'MIGRATIONS_UNLOCK_REPO_FOR_ORG',
    initialBehavior,
  );
}
