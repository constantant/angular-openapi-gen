import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DOWNLOAD_WORKFLOW_RUN_LOGS } from './actions-download-workflow-run-logs.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/download-workflow-run-logs',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/logs',
  method: 'get',
  tag: 'actions',
};

export function provideActionsDownloadWorkflowRunLogsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DOWNLOAD_WORKFLOW_RUN_LOGS,
    'ACTIONS_DOWNLOAD_WORKFLOW_RUN_LOGS',
    initialBehavior,
    _meta,
  );
}
