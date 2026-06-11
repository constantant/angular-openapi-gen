import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_FORCE_CANCEL_WORKFLOW_RUN } from './actions-force-cancel-workflow-run.token';
import type { ActionsForceCancelWorkflowRunResponse } from './actions-force-cancel-workflow-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/force-cancel-workflow-run',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel',
  method: 'post',
  tag: 'actions',
};

export function provideActionsForceCancelWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsForceCancelWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_FORCE_CANCEL_WORKFLOW_RUN,
    'ACTIONS_FORCE_CANCEL_WORKFLOW_RUN',
    initialBehavior,
    _meta,
  );
}
