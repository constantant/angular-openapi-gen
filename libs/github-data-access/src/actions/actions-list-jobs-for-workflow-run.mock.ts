import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN } from './actions-list-jobs-for-workflow-run.token';
import type { ActionsListJobsForWorkflowRunResponse } from './actions-list-jobs-for-workflow-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-jobs-for-workflow-run',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/jobs',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListJobsForWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListJobsForWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN,
    'ACTIONS_LIST_JOBS_FOR_WORKFLOW_RUN',
    initialBehavior,
    _meta,
  );
}
