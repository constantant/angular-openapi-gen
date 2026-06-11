import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_LIST_REPOS_FOR_ORG } from './migrations-list-repos-for-org.token';
import type { MigrationsListReposForOrgResponse } from './migrations-list-repos-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/list-repos-for-org',
  path: '/orgs/{org}/migrations/{migration_id}/repositories',
  method: 'get',
  tag: 'migrations',
};

export function provideMigrationsListReposForOrgMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsListReposForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_LIST_REPOS_FOR_ORG,
    'MIGRATIONS_LIST_REPOS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
