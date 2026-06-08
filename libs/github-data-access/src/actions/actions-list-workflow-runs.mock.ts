import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_WORKFLOW_RUNS } from './actions-list-workflow-runs.token';
import type { ActionsListWorkflowRunsResponse } from './actions-list-workflow-runs.token';

export function provideActionsListWorkflowRunsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListWorkflowRunsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_WORKFLOW_RUNS,
    'ACTIONS_LIST_WORKFLOW_RUNS',
    initialBehavior,
  );
}
