import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_WORKFLOW_RUN } from './actions-list-concurrency-groups-for-workflow-run.token';
import type { ActionsListConcurrencyGroupsForWorkflowRunResponse } from './actions-list-concurrency-groups-for-workflow-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-concurrency-groups-for-workflow-run',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/concurrency_groups',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListConcurrencyGroupsForWorkflowRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListConcurrencyGroupsForWorkflowRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_WORKFLOW_RUN,
    'ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_WORKFLOW_RUN',
    initialBehavior,
    _meta,
  );
}
