import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION } from './actions-get-github-actions-permissions-organization.token';
import type { ActionsGetGithubActionsPermissionsOrganizationResponse } from './actions-get-github-actions-permissions-organization.token';

export function provideActionsGetGithubActionsPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetGithubActionsPermissionsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION,
    'ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION',
    initialBehavior,
  );
}
