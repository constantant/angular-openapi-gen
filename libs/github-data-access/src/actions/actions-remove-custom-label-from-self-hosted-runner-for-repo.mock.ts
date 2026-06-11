import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_REPO } from './actions-remove-custom-label-from-self-hosted-runner-for-repo.token';
import type { ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoResponse } from './actions-remove-custom-label-from-self-hosted-runner-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/remove-custom-label-from-self-hosted-runner-for-repo',
  path: '/repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsRemoveCustomLabelFromSelfHostedRunnerForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_REPO,
    'ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
