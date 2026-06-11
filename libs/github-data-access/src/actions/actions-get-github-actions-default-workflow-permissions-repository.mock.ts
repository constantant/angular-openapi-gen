import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY } from './actions-get-github-actions-default-workflow-permissions-repository.token';
import type { ActionsGetGithubActionsDefaultWorkflowPermissionsRepositoryResponse } from './actions-get-github-actions-default-workflow-permissions-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/get-github-actions-default-workflow-permissions-repository',
  path: '/repos/{owner}/{repo}/actions/permissions/workflow',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetGithubActionsDefaultWorkflowPermissionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetGithubActionsDefaultWorkflowPermissionsRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY,
    'ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
