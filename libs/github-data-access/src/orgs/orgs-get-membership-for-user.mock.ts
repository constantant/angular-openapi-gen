import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_GET_MEMBERSHIP_FOR_USER } from './orgs-get-membership-for-user.token';
import type { OrgsGetMembershipForUserResponse } from './orgs-get-membership-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/get-membership-for-user',
  path: '/orgs/{org}/memberships/{username}',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsGetMembershipForUserMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetMembershipForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_MEMBERSHIP_FOR_USER,
    'ORGS_GET_MEMBERSHIP_FOR_USER',
    initialBehavior,
    _meta,
  );
}
