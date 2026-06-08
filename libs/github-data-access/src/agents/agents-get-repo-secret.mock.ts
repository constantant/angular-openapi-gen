import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_GET_REPO_SECRET } from './agents-get-repo-secret.token';
import type { AgentsGetRepoSecretResponse } from './agents-get-repo-secret.token';

export function provideAgentsGetRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<AgentsGetRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_GET_REPO_SECRET,
    'AGENTS_GET_REPO_SECRET',
    initialBehavior,
  );
}
