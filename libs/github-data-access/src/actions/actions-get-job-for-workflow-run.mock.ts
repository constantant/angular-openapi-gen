import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_JOB_FOR_WORKFLOW_RUN } from './actions-get-job-for-workflow-run.token';
import type { ActionsGetJobForWorkflowRunResponse } from './actions-get-job-for-workflow-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-job-for-workflow-run',
  path: '/repos/{owner}/{repo}/actions/jobs/{job_id}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetJobForWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetJobForWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_JOB_FOR_WORKFLOW_RUN,
    'ACTIONS_GET_JOB_FOR_WORKFLOW_RUN',
    initialBehavior,
    _meta,
  );
}
