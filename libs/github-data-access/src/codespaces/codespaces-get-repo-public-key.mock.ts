import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_REPO_PUBLIC_KEY } from './codespaces-get-repo-public-key.token';
import type { CodespacesGetRepoPublicKeyResponse } from './codespaces-get-repo-public-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/get-repo-public-key',
  path: '/repos/{owner}/{repo}/codespaces/secrets/public-key',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesGetRepoPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetRepoPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_REPO_PUBLIC_KEY,
    'CODESPACES_GET_REPO_PUBLIC_KEY',
    initialBehavior,
    _meta,
  );
}
