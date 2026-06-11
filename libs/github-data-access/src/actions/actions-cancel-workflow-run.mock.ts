import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_CANCEL_WORKFLOW_RUN } from './actions-cancel-workflow-run.token';
import type { ActionsCancelWorkflowRunResponse } from './actions-cancel-workflow-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/cancel-workflow-run',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/cancel',
  method: 'post',
  tag: 'actions',
};

export function provideActionsCancelWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCancelWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CANCEL_WORKFLOW_RUN,
    'ACTIONS_CANCEL_WORKFLOW_RUN',
    initialBehavior,
    _meta,
  );
}
