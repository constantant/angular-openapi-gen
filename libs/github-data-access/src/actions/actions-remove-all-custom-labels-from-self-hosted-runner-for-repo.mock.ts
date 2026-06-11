import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_REPO } from './actions-remove-all-custom-labels-from-self-hosted-runner-for-repo.token';
import type { ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoResponse } from './actions-remove-all-custom-labels-from-self-hosted-runner-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/remove-all-custom-labels-from-self-hosted-runner-for-repo',
  path: '/repos/{owner}/{repo}/actions/runners/{runner_id}/labels',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_REPO,
    'ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
