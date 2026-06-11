import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_APPROVE_WORKFLOW_RUN } from './actions-approve-workflow-run.token';
import type { ActionsApproveWorkflowRunResponse } from './actions-approve-workflow-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/approve-workflow-run',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/approve',
  method: 'post',
  tag: 'actions',
};

export function provideActionsApproveWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsApproveWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_APPROVE_WORKFLOW_RUN,
    'ACTIONS_APPROVE_WORKFLOW_RUN',
    initialBehavior,
    _meta,
  );
}
