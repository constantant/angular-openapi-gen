import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_WORKFLOW_RUN } from './actions-list-concurrency-groups-for-workflow-run.token';
import type { ActionsListConcurrencyGroupsForWorkflowRunResponse } from './actions-list-concurrency-groups-for-workflow-run.token';

export function provideActionsListConcurrencyGroupsForWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListConcurrencyGroupsForWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_WORKFLOW_RUN,
    'ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_WORKFLOW_RUN',
    initialBehavior,
  );
}
