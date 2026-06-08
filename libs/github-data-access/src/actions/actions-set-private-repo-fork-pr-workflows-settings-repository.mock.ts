import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY } from './actions-set-private-repo-fork-pr-workflows-settings-repository.token';

export function provideActionsSetPrivateRepoForkPrWorkflowsSettingsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY,
    'ACTIONS_SET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY',
    initialBehavior,
  );
}
