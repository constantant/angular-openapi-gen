import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_WORKFLOW } from './actions-get-workflow.token';
import type { ActionsGetWorkflowResponse } from './actions-get-workflow.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-workflow',
  path: '/repos/{owner}/{repo}/actions/workflows/{workflow_id}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetWorkflowMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetWorkflowResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_WORKFLOW,
    'ACTIONS_GET_WORKFLOW',
    initialBehavior,
    _meta,
  );
}
