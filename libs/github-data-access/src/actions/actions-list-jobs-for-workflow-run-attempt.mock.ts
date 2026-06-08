import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN_ATTEMPT } from './actions-list-jobs-for-workflow-run-attempt.token';
import type { ActionsListJobsForWorkflowRunAttemptResponse } from './actions-list-jobs-for-workflow-run-attempt.token';

export function provideActionsListJobsForWorkflowRunAttemptMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListJobsForWorkflowRunAttemptResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN_ATTEMPT,
    'ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN_ATTEMPT',
    initialBehavior,
  );
}
