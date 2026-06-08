import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_CUSTOM_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO } from './actions-set-custom-labels-for-self-hosted-runner-for-repo.token';
import type { ActionsSetCustomLabelsForSelfHostedRunnerForRepoResponse } from './actions-set-custom-labels-for-self-hosted-runner-for-repo.token';

export function provideActionsSetCustomLabelsForSelfHostedRunnerForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsSetCustomLabelsForSelfHostedRunnerForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_CUSTOM_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO,
    'ACTIONS_SET_CUSTOM_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO',
    initialBehavior,
  );
}
