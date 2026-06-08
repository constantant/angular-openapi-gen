import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_WORKFLOW_DISPATCH } from './actions-create-workflow-dispatch.token';
import type { ActionsCreateWorkflowDispatchResponse } from './actions-create-workflow-dispatch.token';

export function provideActionsCreateWorkflowDispatchMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateWorkflowDispatchResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_WORKFLOW_DISPATCH,
    'ACTIONS_CREATE_WORKFLOW_DISPATCH',
    initialBehavior,
  );
}
