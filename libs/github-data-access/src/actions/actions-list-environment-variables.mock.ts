import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_ENVIRONMENT_VARIABLES } from './actions-list-environment-variables.token';
import type { ActionsListEnvironmentVariablesResponse } from './actions-list-environment-variables.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-environment-variables',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/variables',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListEnvironmentVariablesMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListEnvironmentVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_ENVIRONMENT_VARIABLES,
    'ACTIONS_LIST_ENVIRONMENT_VARIABLES',
    initialBehavior,
    _meta,
  );
}
