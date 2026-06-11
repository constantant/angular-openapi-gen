import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_REPO_SECRETS } from './actions-list-repo-secrets.token';
import type { ActionsListRepoSecretsResponse } from './actions-list-repo-secrets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-repo-secrets',
  path: '/repos/{owner}/{repo}/actions/secrets',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListRepoSecretsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRepoSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_REPO_SECRETS,
    'ACTIONS_LIST_REPO_SECRETS',
    initialBehavior,
    _meta,
  );
}
