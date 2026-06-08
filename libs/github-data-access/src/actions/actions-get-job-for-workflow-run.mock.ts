import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_JOB_FOR_WORKFLOW_RUN } from './actions-get-job-for-workflow-run.token';
import type { ActionsGetJobForWorkflowRunResponse } from './actions-get-job-for-workflow-run.token';

export function provideActionsGetJobForWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetJobForWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_JOB_FOR_WORKFLOW_RUN,
    'ACTIONS_GET_JOB_FOR_WORKFLOW_RUN',
    initialBehavior,
  );
}
