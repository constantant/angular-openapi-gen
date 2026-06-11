import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_UNLOCK_REPO_FOR_AUTHENTICATED_USER } from './migrations-unlock-repo-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/unlock-repo-for-authenticated-user',
  path: '/user/migrations/{migration_id}/repos/{repo_name}/lock',
  method: 'delete',
  tag: 'migrations',
};

export function provideMigrationsUnlockRepoForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_UNLOCK_REPO_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_UNLOCK_REPO_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
