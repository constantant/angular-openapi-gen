import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DOWNLOAD_WORKFLOW_RUN_ATTEMPT_LOGS } from './actions-download-workflow-run-attempt-logs.token';

export function provideActionsDownloadWorkflowRunAttemptLogsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DOWNLOAD_WORKFLOW_RUN_ATTEMPT_LOGS,
    'ACTIONS_DOWNLOAD_WORKFLOW_RUN_ATTEMPT_LOGS',
    initialBehavior,
  );
}
