import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION } from './actions-set-self-hosted-runners-permissions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-self-hosted-runners-permissions-organization',
  path: '/orgs/{org}/actions/permissions/self-hosted-runners',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetSelfHostedRunnersPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION,
    'ACTIONS_SET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
