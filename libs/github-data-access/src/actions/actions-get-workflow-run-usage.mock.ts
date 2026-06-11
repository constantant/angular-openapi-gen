import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_WORKFLOW_RUN_USAGE } from './actions-get-workflow-run-usage.token';
import type { ActionsGetWorkflowRunUsageResponse } from './actions-get-workflow-run-usage.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-workflow-run-usage',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/timing',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetWorkflowRunUsageMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetWorkflowRunUsageResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_WORKFLOW_RUN_USAGE,
    'ACTIONS_GET_WORKFLOW_RUN_USAGE',
    initialBehavior,
    _meta,
  );
}
