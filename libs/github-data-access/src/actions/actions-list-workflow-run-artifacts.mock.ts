import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_WORKFLOW_RUN_ARTIFACTS } from './actions-list-workflow-run-artifacts.token';
import type { ActionsListWorkflowRunArtifactsResponse } from './actions-list-workflow-run-artifacts.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-workflow-run-artifacts',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/artifacts',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListWorkflowRunArtifactsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListWorkflowRunArtifactsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_WORKFLOW_RUN_ARTIFACTS,
    'ACTIONS_LIST_WORKFLOW_RUN_ARTIFACTS',
    initialBehavior,
    _meta,
  );
}
