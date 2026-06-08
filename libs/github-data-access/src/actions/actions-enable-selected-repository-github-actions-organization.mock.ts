import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_ENABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION } from './actions-enable-selected-repository-github-actions-organization.token';

export function provideActionsEnableSelectedRepositoryGithubActionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ENABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION,
    'ACTIONS_ENABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION',
    initialBehavior,
  );
}
