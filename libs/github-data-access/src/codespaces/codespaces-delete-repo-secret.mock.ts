import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_DELETE_REPO_SECRET } from './codespaces-delete-repo-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/delete-repo-secret',
  path: '/repos/{owner}/{repo}/codespaces/secrets/{secret_name}',
  method: 'delete',
  tag: 'codespaces',
};

export function provideCodespacesDeleteRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_DELETE_REPO_SECRET,
    'CODESPACES_DELETE_REPO_SECRET',
    initialBehavior,
    _meta,
  );
}
