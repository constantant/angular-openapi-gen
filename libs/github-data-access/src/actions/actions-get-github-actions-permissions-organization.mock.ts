import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION } from './actions-get-github-actions-permissions-organization.token';
import type { ActionsGetGithubActionsPermissionsOrganizationResponse } from './actions-get-github-actions-permissions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-github-actions-permissions-organization',
  path: '/orgs/{org}/actions/permissions',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetGithubActionsPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetGithubActionsPermissionsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION,
    'ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
