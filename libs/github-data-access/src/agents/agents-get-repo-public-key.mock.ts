import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_GET_REPO_PUBLIC_KEY } from './agents-get-repo-public-key.token';
import type { AgentsGetRepoPublicKeyResponse } from './agents-get-repo-public-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/get-repo-public-key',
  path: '/repos/{owner}/{repo}/agents/secrets/public-key',
  method: 'get',
  tag: 'agents',
};

export function provideAgentsGetRepoPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<AgentsGetRepoPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_GET_REPO_PUBLIC_KEY,
    'AGENTS_GET_REPO_PUBLIC_KEY',
    initialBehavior,
    _meta,
  );
}
