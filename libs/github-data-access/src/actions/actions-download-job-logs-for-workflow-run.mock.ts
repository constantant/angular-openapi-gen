import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DOWNLOAD_JOB_LOGS_FOR_WORKFLOW_RUN } from './actions-download-job-logs-for-workflow-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/download-job-logs-for-workflow-run',
  path: '/repos/{owner}/{repo}/actions/jobs/{job_id}/logs',
  method: 'get',
  tag: 'actions',
};

export function provideActionsDownloadJobLogsForWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DOWNLOAD_JOB_LOGS_FOR_WORKFLOW_RUN,
    'ACTIONS_DOWNLOAD_JOB_LOGS_FOR_WORKFLOW_RUN',
    initialBehavior,
    _meta,
  );
}
