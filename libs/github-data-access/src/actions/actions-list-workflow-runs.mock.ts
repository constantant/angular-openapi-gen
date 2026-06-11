import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_WORKFLOW_RUNS } from './actions-list-workflow-runs.token';
import type { ActionsListWorkflowRunsResponse } from './actions-list-workflow-runs.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-workflow-runs',
  path: '/repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListWorkflowRunsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListWorkflowRunsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_WORKFLOW_RUNS,
    'ACTIONS_LIST_WORKFLOW_RUNS',
    initialBehavior,
    _meta,
  );
}
