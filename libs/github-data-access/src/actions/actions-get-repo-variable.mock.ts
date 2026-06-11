import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_REPO_VARIABLE } from './actions-get-repo-variable.token';
import type { ActionsGetRepoVariableResponse } from './actions-get-repo-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-repo-variable',
  path: '/repos/{owner}/{repo}/actions/variables/{name}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetRepoVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_REPO_VARIABLE,
    'ACTIONS_GET_REPO_VARIABLE',
    initialBehavior,
    _meta,
  );
}
