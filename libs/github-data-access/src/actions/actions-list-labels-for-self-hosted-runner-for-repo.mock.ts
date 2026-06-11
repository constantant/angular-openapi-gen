import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO } from './actions-list-labels-for-self-hosted-runner-for-repo.token';
import type { ActionsListLabelsForSelfHostedRunnerForRepoResponse } from './actions-list-labels-for-self-hosted-runner-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-labels-for-self-hosted-runner-for-repo',
  path: '/repos/{owner}/{repo}/actions/runners/{runner_id}/labels',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListLabelsForSelfHostedRunnerForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListLabelsForSelfHostedRunnerForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO,
    'ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
