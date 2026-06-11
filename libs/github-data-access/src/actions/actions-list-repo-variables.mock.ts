import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_REPO_VARIABLES } from './actions-list-repo-variables.token';
import type { ActionsListRepoVariablesResponse } from './actions-list-repo-variables.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-repo-variables',
  path: '/repos/{owner}/{repo}/actions/variables',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListRepoVariablesMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRepoVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_REPO_VARIABLES,
    'ACTIONS_LIST_REPO_VARIABLES',
    initialBehavior,
    _meta,
  );
}
