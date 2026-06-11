import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_WORKFLOW_RUN_LOGS } from './actions-delete-workflow-run-logs.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-workflow-run-logs',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/logs',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteWorkflowRunLogsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_WORKFLOW_RUN_LOGS,
    'ACTIONS_DELETE_WORKFLOW_RUN_LOGS',
    initialBehavior,
    _meta,
  );
}
