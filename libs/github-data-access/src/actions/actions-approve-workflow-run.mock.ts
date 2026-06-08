import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_APPROVE_WORKFLOW_RUN } from './actions-approve-workflow-run.token';
import type { ActionsApproveWorkflowRunResponse } from './actions-approve-workflow-run.token';

export function provideActionsApproveWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsApproveWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_APPROVE_WORKFLOW_RUN,
    'ACTIONS_APPROVE_WORKFLOW_RUN',
    initialBehavior,
  );
}
