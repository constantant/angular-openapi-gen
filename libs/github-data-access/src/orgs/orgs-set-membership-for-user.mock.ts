import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_SET_MEMBERSHIP_FOR_USER } from './orgs-set-membership-for-user.token';
import type { OrgsSetMembershipForUserResponse } from './orgs-set-membership-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/set-membership-for-user',
  path: '/orgs/{org}/memberships/{username}',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsSetMembershipForUserMock(
  initialBehavior?: ProviderInitialBehavior<OrgsSetMembershipForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_SET_MEMBERSHIP_FOR_USER,
    'ORGS_SET_MEMBERSHIP_FOR_USER',
    initialBehavior,
    _meta,
  );
}
