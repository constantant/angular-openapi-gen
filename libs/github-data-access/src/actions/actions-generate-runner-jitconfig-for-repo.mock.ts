import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_REPO } from './actions-generate-runner-jitconfig-for-repo.token';
import type { ActionsGenerateRunnerJitconfigForRepoResponse } from './actions-generate-runner-jitconfig-for-repo.token';

export function provideActionsGenerateRunnerJitconfigForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGenerateRunnerJitconfigForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_REPO,
    'ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_REPO',
    initialBehavior,
  );
}
