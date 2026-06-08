import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_LIST_REPOS_FOR_ORG } from './migrations-list-repos-for-org.token';
import type { MigrationsListReposForOrgResponse } from './migrations-list-repos-for-org.token';

export function provideMigrationsListReposForOrgMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsListReposForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_LIST_REPOS_FOR_ORG,
    'MIGRATIONS_LIST_REPOS_FOR_ORG',
    initialBehavior,
  );
}
