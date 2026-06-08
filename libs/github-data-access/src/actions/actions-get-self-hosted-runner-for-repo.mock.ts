import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_SELF_HOSTED_RUNNER_FOR_REPO } from './actions-get-self-hosted-runner-for-repo.token';
import type { ActionsGetSelfHostedRunnerForRepoResponse } from './actions-get-self-hosted-runner-for-repo.token';

export function provideActionsGetSelfHostedRunnerForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetSelfHostedRunnerForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_SELF_HOSTED_RUNNER_FOR_REPO,
    'ACTIONS_GET_SELF_HOSTED_RUNNER_FOR_REPO',
    initialBehavior,
  );
}
