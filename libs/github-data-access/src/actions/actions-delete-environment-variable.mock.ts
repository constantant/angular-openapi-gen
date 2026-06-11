import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ENVIRONMENT_VARIABLE } from './actions-delete-environment-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-environment-variable',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteEnvironmentVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ENVIRONMENT_VARIABLE,
    'ACTIONS_DELETE_ENVIRONMENT_VARIABLE',
    initialBehavior,
    _meta,
  );
}
