import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_MEMBERSHIP_FOR_AUTHENTICATED_USER } from './orgs-update-membership-for-authenticated-user.token';
import type { OrgsUpdateMembershipForAuthenticatedUserResponse } from './orgs-update-membership-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/update-membership-for-authenticated-user',
  path: '/user/memberships/orgs/{org}',
  method: 'patch',
  tag: 'orgs',
};

export function provideOrgsUpdateMembershipForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdateMembershipForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_MEMBERSHIP_FOR_AUTHENTICATED_USER,
    'ORGS_UPDATE_MEMBERSHIP_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
