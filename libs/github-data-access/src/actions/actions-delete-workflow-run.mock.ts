import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_WORKFLOW_RUN } from './actions-delete-workflow-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-workflow-run',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_WORKFLOW_RUN,
    'ACTIONS_DELETE_WORKFLOW_RUN',
    initialBehavior,
    _meta,
  );
}
