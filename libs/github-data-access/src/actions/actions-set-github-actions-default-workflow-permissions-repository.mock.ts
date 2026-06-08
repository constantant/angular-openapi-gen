import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY } from './actions-set-github-actions-default-workflow-permissions-repository.token';

export function provideActionsSetGithubActionsDefaultWorkflowPermissionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY,
    'ACTIONS_SET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY',
    initialBehavior,
  );
}
