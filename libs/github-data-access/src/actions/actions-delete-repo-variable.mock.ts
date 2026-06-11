import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_REPO_VARIABLE } from './actions-delete-repo-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-repo-variable',
  path: '/repos/{owner}/{repo}/actions/variables/{name}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_REPO_VARIABLE,
    'ACTIONS_DELETE_REPO_VARIABLE',
    initialBehavior,
    _meta,
  );
}
