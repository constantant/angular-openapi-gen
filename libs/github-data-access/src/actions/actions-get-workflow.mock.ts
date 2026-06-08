import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_WORKFLOW } from './actions-get-workflow.token';
import type { ActionsGetWorkflowResponse } from './actions-get-workflow.token';

export function provideActionsGetWorkflowMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetWorkflowResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_WORKFLOW,
    'ACTIONS_GET_WORKFLOW',
    initialBehavior,
  );
}
