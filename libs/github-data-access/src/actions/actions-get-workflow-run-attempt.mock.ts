import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_WORKFLOW_RUN_ATTEMPT } from './actions-get-workflow-run-attempt.token';
import type { ActionsGetWorkflowRunAttemptResponse } from './actions-get-workflow-run-attempt.token';

export function provideActionsGetWorkflowRunAttemptMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetWorkflowRunAttemptResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_WORKFLOW_RUN_ATTEMPT,
    'ACTIONS_GET_WORKFLOW_RUN_ATTEMPT',
    initialBehavior,
  );
}
