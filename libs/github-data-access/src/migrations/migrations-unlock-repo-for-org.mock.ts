import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_UNLOCK_REPO_FOR_ORG } from './migrations-unlock-repo-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/unlock-repo-for-org',
  path: '/orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock',
  method: 'delete',
  tag: 'migrations',
};

export function provideMigrationsUnlockRepoForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_UNLOCK_REPO_FOR_ORG,
    'MIGRATIONS_UNLOCK_REPO_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
