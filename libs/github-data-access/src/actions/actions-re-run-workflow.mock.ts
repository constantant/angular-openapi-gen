import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_RE_RUN_WORKFLOW } from './actions-re-run-workflow.token';
import type { ActionsReRunWorkflowResponse } from './actions-re-run-workflow.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/re-run-workflow',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/rerun',
  method: 'post',
  tag: 'actions',
};

export function provideActionsReRunWorkflowMock(
  initialBehavior?: ProviderInitialBehavior<ActionsReRunWorkflowResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_RE_RUN_WORKFLOW,
    'ACTIONS_RE_RUN_WORKFLOW',
    initialBehavior,
    _meta,
  );
}
