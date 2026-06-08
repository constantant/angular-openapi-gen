import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_WORKFLOW_RUN } from './actions-delete-workflow-run.token';

export function provideActionsDeleteWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_WORKFLOW_RUN,
    'ACTIONS_DELETE_WORKFLOW_RUN',
    initialBehavior,
  );
}
