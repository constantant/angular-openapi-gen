import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_DELETE_REPO_SECRET } from './agents-delete-repo-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/delete-repo-secret',
  path: '/repos/{owner}/{repo}/agents/secrets/{secret_name}',
  method: 'delete',
  tag: 'agents',
};

export function provideAgentsDeleteRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    AGENTS_DELETE_REPO_SECRET,
    'AGENTS_DELETE_REPO_SECRET',
    initialBehavior,
    _meta,
    options,
  );
}
