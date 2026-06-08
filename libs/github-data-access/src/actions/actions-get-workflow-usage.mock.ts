import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_WORKFLOW_USAGE } from './actions-get-workflow-usage.token';
import type { ActionsGetWorkflowUsageResponse } from './actions-get-workflow-usage.token';

export function provideActionsGetWorkflowUsageMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetWorkflowUsageResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_WORKFLOW_USAGE,
    'ACTIONS_GET_WORKFLOW_USAGE',
    initialBehavior,
  );
}
