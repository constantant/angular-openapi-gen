import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_RE_RUN_JOB_FOR_WORKFLOW_RUN } from './actions-re-run-job-for-workflow-run.token';
import type { ActionsReRunJobForWorkflowRunResponse } from './actions-re-run-job-for-workflow-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/re-run-job-for-workflow-run',
  path: '/repos/{owner}/{repo}/actions/jobs/{job_id}/rerun',
  method: 'post',
  tag: 'actions',
};

export function provideActionsReRunJobForWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsReRunJobForWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_RE_RUN_JOB_FOR_WORKFLOW_RUN,
    'ACTIONS_RE_RUN_JOB_FOR_WORKFLOW_RUN',
    initialBehavior,
    _meta,
  );
}
