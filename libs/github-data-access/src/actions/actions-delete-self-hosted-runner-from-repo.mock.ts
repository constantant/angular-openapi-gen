import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_REPO } from './actions-delete-self-hosted-runner-from-repo.token';

export function provideActionsDeleteSelfHostedRunnerFromRepoMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_REPO,
    'ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_REPO',
    initialBehavior,
  );
}
