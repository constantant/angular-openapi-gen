import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_UPDATE_REPO_VARIABLE } from './actions-update-repo-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/update-repo-variable',
  path: '/repos/{owner}/{repo}/actions/variables/{name}',
  method: 'patch',
  tag: 'actions',
};

export function provideActionsUpdateRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_UPDATE_REPO_VARIABLE,
    'ACTIONS_UPDATE_REPO_VARIABLE',
    initialBehavior,
    _meta,
  );
}
