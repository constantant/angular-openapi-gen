import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_WORKFLOW_RUN_USAGE } from './actions-get-workflow-run-usage.token';
import type { ActionsGetWorkflowRunUsageResponse } from './actions-get-workflow-run-usage.token';

export function provideActionsGetWorkflowRunUsageMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetWorkflowRunUsageResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_WORKFLOW_RUN_USAGE,
    'ACTIONS_GET_WORKFLOW_RUN_USAGE',
    initialBehavior,
  );
}
