import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_REPO } from './actions-add-custom-labels-to-self-hosted-runner-for-repo.token';
import type { ActionsAddCustomLabelsToSelfHostedRunnerForRepoResponse } from './actions-add-custom-labels-to-self-hosted-runner-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/add-custom-labels-to-self-hosted-runner-for-repo',
  path: '/repos/{owner}/{repo}/actions/runners/{runner_id}/labels',
  method: 'post',
  tag: 'actions',
};

export function provideActionsAddCustomLabelsToSelfHostedRunnerForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsAddCustomLabelsToSelfHostedRunnerForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_REPO,
    'ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
