import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_REPO } from './actions-remove-all-custom-labels-from-self-hosted-runner-for-repo.token';
import type { ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoResponse } from './actions-remove-all-custom-labels-from-self-hosted-runner-for-repo.token';

export function provideActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_REPO,
    'ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_REPO',
    initialBehavior,
  );
}
