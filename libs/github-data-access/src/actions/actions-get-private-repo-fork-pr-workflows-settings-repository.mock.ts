import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY } from './actions-get-private-repo-fork-pr-workflows-settings-repository.token';
import type { ActionsGetPrivateRepoForkPrWorkflowsSettingsRepositoryResponse } from './actions-get-private-repo-fork-pr-workflows-settings-repository.token';

export function provideActionsGetPrivateRepoForkPrWorkflowsSettingsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetPrivateRepoForkPrWorkflowsSettingsRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY,
    'ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY',
    initialBehavior,
  );
}
