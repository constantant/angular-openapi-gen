import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_REPO } from './actions-list-runner-applications-for-repo.token';
import type { ActionsListRunnerApplicationsForRepoResponse } from './actions-list-runner-applications-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-runner-applications-for-repo',
  path: '/repos/{owner}/{repo}/actions/runners/downloads',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListRunnerApplicationsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRunnerApplicationsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_REPO,
    'ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
