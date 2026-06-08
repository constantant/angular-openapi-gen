import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN } from './actions-list-jobs-for-workflow-run.token';
import type { ActionsListJobsForWorkflowRunResponse } from './actions-list-jobs-for-workflow-run.token';

export function provideActionsListJobsForWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListJobsForWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN,
    'ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN',
    initialBehavior,
  );
}
