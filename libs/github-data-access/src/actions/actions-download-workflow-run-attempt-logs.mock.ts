import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DOWNLOAD_WORKFLOW_RUN_ATTEMPT_LOGS } from './actions-download-workflow-run-attempt-logs.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/download-workflow-run-attempt-logs',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs',
  method: 'get',
  tag: 'actions',
};

export function provideActionsDownloadWorkflowRunAttemptLogsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DOWNLOAD_WORKFLOW_RUN_ATTEMPT_LOGS,
    'ACTIONS_DOWNLOAD_WORKFLOW_RUN_ATTEMPT_LOGS',
    initialBehavior,
    _meta,
  );
}
