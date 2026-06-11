import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_WORKFLOW_USAGE } from './actions-get-workflow-usage.token';
import type { ActionsGetWorkflowUsageResponse } from './actions-get-workflow-usage.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-workflow-usage',
  path: '/repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetWorkflowUsageMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetWorkflowUsageResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_WORKFLOW_USAGE,
    'ACTIONS_GET_WORKFLOW_USAGE',
    initialBehavior,
    _meta,
  );
}
