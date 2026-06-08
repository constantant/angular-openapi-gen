import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_REPO_SECRETS } from './agents-list-repo-secrets.token';
import type { AgentsListRepoSecretsResponse } from './agents-list-repo-secrets.token';

export function provideAgentsListRepoSecretsMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListRepoSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_REPO_SECRETS,
    'AGENTS_LIST_REPO_SECRETS',
    initialBehavior,
  );
}
