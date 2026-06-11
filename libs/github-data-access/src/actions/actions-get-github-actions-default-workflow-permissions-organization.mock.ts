import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_ORGANIZATION } from './actions-get-github-actions-default-workflow-permissions-organization.token';
import type { ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationResponse } from './actions-get-github-actions-default-workflow-permissions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/get-github-actions-default-workflow-permissions-organization',
  path: '/orgs/{org}/actions/permissions/workflow',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_ORGANIZATION,
    'ACTIONS_GET_GITHUB_ACTIONS_DEFAULT_WORKFLOW_PERMISSIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
