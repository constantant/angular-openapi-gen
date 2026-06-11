import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DISABLE_WORKFLOW } from './actions-disable-workflow.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/disable-workflow',
  path: '/repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable',
  method: 'put',
  tag: 'actions',
};

export function provideActionsDisableWorkflowMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DISABLE_WORKFLOW,
    'ACTIONS_DISABLE_WORKFLOW',
    initialBehavior,
    _meta,
  );
}
