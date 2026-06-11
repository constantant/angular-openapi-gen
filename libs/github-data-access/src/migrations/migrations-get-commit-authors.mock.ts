import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_GET_COMMIT_AUTHORS } from './migrations-get-commit-authors.token';
import type { MigrationsGetCommitAuthorsResponse } from './migrations-get-commit-authors.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/get-commit-authors',
  path: '/repos/{owner}/{repo}/import/authors',
  method: 'get',
  tag: 'migrations',
};

export function provideMigrationsGetCommitAuthorsMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsGetCommitAuthorsResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_GET_COMMIT_AUTHORS,
    'MIGRATIONS_GET_COMMIT_AUTHORS',
    initialBehavior,
    _meta,
  );
}
