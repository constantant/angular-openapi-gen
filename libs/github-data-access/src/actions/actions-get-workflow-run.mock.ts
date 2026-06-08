import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_WORKFLOW_RUN } from './actions-get-workflow-run.token';
import type { ActionsGetWorkflowRunResponse } from './actions-get-workflow-run.token';

export function provideActionsGetWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_WORKFLOW_RUN,
    'ACTIONS_GET_WORKFLOW_RUN',
    initialBehavior,
  );
}
