import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_REPO } from './actions-add-custom-labels-to-self-hosted-runner-for-repo.token';
import type { ActionsAddCustomLabelsToSelfHostedRunnerForRepoResponse } from './actions-add-custom-labels-to-self-hosted-runner-for-repo.token';

export function provideActionsAddCustomLabelsToSelfHostedRunnerForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsAddCustomLabelsToSelfHostedRunnerForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_REPO,
    'ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_REPO',
    initialBehavior,
  );
}
