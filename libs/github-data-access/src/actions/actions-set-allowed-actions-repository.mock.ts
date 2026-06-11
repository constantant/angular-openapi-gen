import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ALLOWED_ACTIONS_REPOSITORY } from './actions-set-allowed-actions-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-allowed-actions-repository',
  path: '/repos/{owner}/{repo}/actions/permissions/selected-actions',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetAllowedActionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ALLOWED_ACTIONS_REPOSITORY,
    'ACTIONS_SET_ALLOWED_ACTIONS_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
