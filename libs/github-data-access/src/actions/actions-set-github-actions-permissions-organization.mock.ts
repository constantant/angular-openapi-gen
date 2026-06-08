import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION } from './actions-set-github-actions-permissions-organization.token';

export function provideActionsSetGithubActionsPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION,
    'ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION',
    initialBehavior,
  );
}
