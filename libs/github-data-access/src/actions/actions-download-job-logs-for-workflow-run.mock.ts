import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DOWNLOAD_JOB_LOGS_FOR_WORKFLOW_RUN } from './actions-download-job-logs-for-workflow-run.token';

export function provideActionsDownloadJobLogsForWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DOWNLOAD_JOB_LOGS_FOR_WORKFLOW_RUN,
    'ACTIONS_DOWNLOAD_JOB_LOGS_FOR_WORKFLOW_RUN',
    initialBehavior,
  );
}
