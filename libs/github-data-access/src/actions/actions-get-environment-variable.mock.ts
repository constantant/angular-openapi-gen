import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ENVIRONMENT_VARIABLE } from './actions-get-environment-variable.token';
import type { ActionsGetEnvironmentVariableResponse } from './actions-get-environment-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-environment-variable',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetEnvironmentVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetEnvironmentVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ENVIRONMENT_VARIABLE,
    'ACTIONS_GET_ENVIRONMENT_VARIABLE',
    initialBehavior,
    _meta,
  );
}
