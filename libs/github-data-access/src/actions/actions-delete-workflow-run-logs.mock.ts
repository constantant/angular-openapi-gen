import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_WORKFLOW_RUN_LOGS } from './actions-delete-workflow-run-logs.token';

export function provideActionsDeleteWorkflowRunLogsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_WORKFLOW_RUN_LOGS,
    'ACTIONS_DELETE_WORKFLOW_RUN_LOGS',
    initialBehavior,
  );
}
