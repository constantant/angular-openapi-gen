import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_CREATE_OR_UPDATE_REPO_SECRET } from './agents-create-or-update-repo-secret.token';
import type { AgentsCreateOrUpdateRepoSecretResponse } from './agents-create-or-update-repo-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/create-or-update-repo-secret',
  path: '/repos/{owner}/{repo}/agents/secrets/{secret_name}',
  method: 'put',
  tag: 'agents',
};

export function provideAgentsCreateOrUpdateRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<AgentsCreateOrUpdateRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_CREATE_OR_UPDATE_REPO_SECRET,
    'AGENTS_CREATE_OR_UPDATE_REPO_SECRET',
    initialBehavior,
    _meta,
  );
}
