import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_RE_RUN_WORKFLOW_FAILED_JOBS } from './actions-re-run-workflow-failed-jobs.token';
import type { ActionsReRunWorkflowFailedJobsResponse } from './actions-re-run-workflow-failed-jobs.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/re-run-workflow-failed-jobs',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs',
  method: 'post',
  tag: 'actions',
};

export function provideActionsReRunWorkflowFailedJobsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsReRunWorkflowFailedJobsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_RE_RUN_WORKFLOW_FAILED_JOBS,
    'ACTIONS_RE_RUN_WORKFLOW_FAILED_JOBS',
    initialBehavior,
    _meta,
  );
}
