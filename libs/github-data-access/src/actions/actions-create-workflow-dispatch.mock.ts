import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_WORKFLOW_DISPATCH } from './actions-create-workflow-dispatch.token';
import type { ActionsCreateWorkflowDispatchResponse } from './actions-create-workflow-dispatch.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/create-workflow-dispatch',
  path: '/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
  method: 'post',
  tag: 'actions',
};

export function provideActionsCreateWorkflowDispatchMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateWorkflowDispatchResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_WORKFLOW_DISPATCH,
    'ACTIONS_CREATE_WORKFLOW_DISPATCH',
    initialBehavior,
    _meta,
  );
}
