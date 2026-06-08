import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_REPO_SECRETS } from './actions-list-repo-secrets.token';
import type { ActionsListRepoSecretsResponse } from './actions-list-repo-secrets.token';

export function provideActionsListRepoSecretsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRepoSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_REPO_SECRETS,
    'ACTIONS_LIST_REPO_SECRETS',
    initialBehavior,
  );
}
