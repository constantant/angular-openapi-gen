import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_WORKFLOW_RUN } from './actions-get-workflow-run.token';
import type { ActionsGetWorkflowRunResponse } from './actions-get-workflow-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-workflow-run',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_WORKFLOW_RUN,
    'ACTIONS_GET_WORKFLOW_RUN',
    initialBehavior,
    _meta,
  );
}
