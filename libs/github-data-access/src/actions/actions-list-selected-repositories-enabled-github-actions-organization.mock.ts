import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION } from './actions-list-selected-repositories-enabled-github-actions-organization.token';
import type { ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationResponse } from './actions-list-selected-repositories-enabled-github-actions-organization.token';

export function provideActionsListSelectedRepositoriesEnabledGithubActionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION,
    'ACTIONS_LIST_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION',
    initialBehavior,
  );
}
