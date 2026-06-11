import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION } from './actions-set-github-actions-permissions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-github-actions-permissions-organization',
  path: '/orgs/{org}/actions/permissions',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetGithubActionsPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION,
    'ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
