import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_REMOVE_TOKEN_FOR_REPO } from './actions-create-remove-token-for-repo.token';
import type { ActionsCreateRemoveTokenForRepoResponse } from './actions-create-remove-token-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/create-remove-token-for-repo',
  path: '/repos/{owner}/{repo}/actions/runners/remove-token',
  method: 'post',
  tag: 'actions',
};

export function provideActionsCreateRemoveTokenForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateRemoveTokenForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_REMOVE_TOKEN_FOR_REPO,
    'ACTIONS_CREATE_REMOVE_TOKEN_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
