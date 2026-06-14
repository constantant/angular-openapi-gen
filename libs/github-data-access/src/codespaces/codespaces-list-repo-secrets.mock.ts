import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_REPO_SECRETS } from './codespaces-list-repo-secrets.token';
import type { CodespacesListRepoSecretsResponse } from './codespaces-list-repo-secrets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/list-repo-secrets',
  path: '/repos/{owner}/{repo}/codespaces/secrets',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesListRepoSecretsMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListRepoSecretsResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_REPO_SECRETS,
    'CODESPACES_LIST_REPO_SECRETS',
    initialBehavior,
    _meta,
    options,
  );
}
