import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ALLOWED_ACTIONS_REPOSITORY } from './actions-get-allowed-actions-repository.token';
import type { ActionsGetAllowedActionsRepositoryResponse } from './actions-get-allowed-actions-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-allowed-actions-repository',
  path: '/repos/{owner}/{repo}/actions/permissions/selected-actions',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetAllowedActionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetAllowedActionsRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ALLOWED_ACTIONS_REPOSITORY,
    'ACTIONS_GET_ALLOWED_ACTIONS_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
