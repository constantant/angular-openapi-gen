import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY } from './actions-get-github-actions-default-workflow-permissions-repository.token';
import type { ActionsGetGithubActionsDefaultWorkflowPermissionsRepositoryResponse } from './actions-get-github-actions-default-workflow-permissions-repository.token';

export function provideActionsGetGithubActionsDefaultWorkflowPermissionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetGithubActionsDefaultWorkflowPermissionsRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY,
    'ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY',
    initialBehavior,
  );
}
