import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_REPO_WORKFLOWS } from './actions-list-repo-workflows.token';
import type { ActionsListRepoWorkflowsResponse } from './actions-list-repo-workflows.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-repo-workflows',
  path: '/repos/{owner}/{repo}/actions/workflows',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListRepoWorkflowsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRepoWorkflowsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_REPO_WORKFLOWS,
    'ACTIONS_LIST_REPO_WORKFLOWS',
    initialBehavior,
    _meta,
  );
}
