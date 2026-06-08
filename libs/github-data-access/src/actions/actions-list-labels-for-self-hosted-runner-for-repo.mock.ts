import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO } from './actions-list-labels-for-self-hosted-runner-for-repo.token';
import type { ActionsListLabelsForSelfHostedRunnerForRepoResponse } from './actions-list-labels-for-self-hosted-runner-for-repo.token';

export function provideActionsListLabelsForSelfHostedRunnerForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListLabelsForSelfHostedRunnerForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO,
    'ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_REPO',
    initialBehavior,
  );
}
