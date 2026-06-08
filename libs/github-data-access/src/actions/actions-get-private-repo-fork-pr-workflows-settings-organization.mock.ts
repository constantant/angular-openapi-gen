import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION } from './actions-get-private-repo-fork-pr-workflows-settings-organization.token';
import type { ActionsGetPrivateRepoForkPrWorkflowsSettingsOrganizationResponse } from './actions-get-private-repo-fork-pr-workflows-settings-organization.token';

export function provideActionsGetPrivateRepoForkPrWorkflowsSettingsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetPrivateRepoForkPrWorkflowsSettingsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION,
    'ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION',
    initialBehavior,
  );
}
