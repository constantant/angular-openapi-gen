import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_UPDATE_ENVIRONMENT_VARIABLE } from './actions-update-environment-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/update-environment-variable',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}',
  method: 'patch',
  tag: 'actions',
};

export function provideActionsUpdateEnvironmentVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_UPDATE_ENVIRONMENT_VARIABLE,
    'ACTIONS_UPDATE_ENVIRONMENT_VARIABLE',
    initialBehavior,
    _meta,
  );
}
