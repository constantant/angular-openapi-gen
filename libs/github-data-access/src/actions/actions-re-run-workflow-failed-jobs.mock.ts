import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_RE_RUN_WORKFLOW_FAILED_JOBS } from './actions-re-run-workflow-failed-jobs.token';
import type { ActionsReRunWorkflowFailedJobsResponse } from './actions-re-run-workflow-failed-jobs.token';

export function provideActionsReRunWorkflowFailedJobsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsReRunWorkflowFailedJobsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_RE_RUN_WORKFLOW_FAILED_JOBS,
    'ACTIONS_RE_RUN_WORKFLOW_FAILED_JOBS',
    initialBehavior,
  );
}
