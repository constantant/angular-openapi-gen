import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DISABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION } from './actions-disable-selected-repository-github-actions-organization.token';

export function provideActionsDisableSelectedRepositoryGithubActionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DISABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION,
    'ACTIONS_DISABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION',
    initialBehavior,
  );
}
