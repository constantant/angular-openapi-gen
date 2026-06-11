import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_ENVIRONMENT_VARIABLE } from './actions-create-environment-variable.token';
import type { ActionsCreateEnvironmentVariableResponse } from './actions-create-environment-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/create-environment-variable',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/variables',
  method: 'post',
  tag: 'actions',
};

export function provideActionsCreateEnvironmentVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateEnvironmentVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_ENVIRONMENT_VARIABLE,
    'ACTIONS_CREATE_ENVIRONMENT_VARIABLE',
    initialBehavior,
    _meta,
  );
}
