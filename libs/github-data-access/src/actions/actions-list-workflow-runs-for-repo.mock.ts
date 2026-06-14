import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_WORKFLOW_RUNS_FOR_REPO } from './actions-list-workflow-runs-for-repo.token';
import type { ActionsListWorkflowRunsForRepoResponse } from './actions-list-workflow-runs-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-workflow-runs-for-repo',
  path: '/repos/{owner}/{repo}/actions/runs',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListWorkflowRunsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListWorkflowRunsForRepoResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_WORKFLOW_RUNS_FOR_REPO,
    'ACTIONS_LIST_WORKFLOW_RUNS_FOR_REPO',
    initialBehavior,
    _meta,
    options,
  );
}
