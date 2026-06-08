import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DOWNLOAD_WORKFLOW_RUN_LOGS } from './actions-download-workflow-run-logs.token';

export function provideActionsDownloadWorkflowRunLogsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DOWNLOAD_WORKFLOW_RUN_LOGS,
    'ACTIONS_DOWNLOAD_WORKFLOW_RUN_LOGS',
    initialBehavior,
  );
}
