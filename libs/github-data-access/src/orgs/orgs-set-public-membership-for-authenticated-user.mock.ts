import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_SET_PUBLIC_MEMBERSHIP_FOR_AUTHENTICATED_USER } from './orgs-set-public-membership-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/set-public-membership-for-authenticated-user',
  path: '/orgs/{org}/public_members/{username}',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsSetPublicMembershipForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_SET_PUBLIC_MEMBERSHIP_FOR_AUTHENTICATED_USER,
    'ORGS_SET_PUBLIC_MEMBERSHIP_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
