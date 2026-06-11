import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_MAP_COMMIT_AUTHOR } from './migrations-map-commit-author.token';
import type { MigrationsMapCommitAuthorResponse } from './migrations-map-commit-author.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/map-commit-author',
  path: '/repos/{owner}/{repo}/import/authors/{author_id}',
  method: 'patch',
  tag: 'migrations',
};

export function provideMigrationsMapCommitAuthorMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsMapCommitAuthorResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_MAP_COMMIT_AUTHOR,
    'MIGRATIONS_MAP_COMMIT_AUTHOR',
    initialBehavior,
    _meta,
  );
}
