import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_ORGANIZATION } from './actions-set-github-actions-default-workflow-permissions-organization.token';

export function provideActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_ORGANIZATION,
    'ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_ORGANIZATION',
    initialBehavior,
  );
}
