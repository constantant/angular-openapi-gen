import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_REPO_SECRETS } from './agents-list-repo-secrets.token';
import type { AgentsListRepoSecretsResponse } from './agents-list-repo-secrets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/list-repo-secrets',
  path: '/repos/{owner}/{repo}/agents/secrets',
  method: 'get',
  tag: 'agents',
};

export function provideAgentsListRepoSecretsMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListRepoSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_REPO_SECRETS,
    'AGENTS_LIST_REPO_SECRETS',
    initialBehavior,
    _meta,
  );
}
