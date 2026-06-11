import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_ENABLE_WORKFLOW } from './actions-enable-workflow.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/enable-workflow',
  path: '/repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable',
  method: 'put',
  tag: 'actions',
};

export function provideActionsEnableWorkflowMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ENABLE_WORKFLOW,
    'ACTIONS_ENABLE_WORKFLOW',
    initialBehavior,
    _meta,
  );
}
