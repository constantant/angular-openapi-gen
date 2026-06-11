import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REMOVE_PUBLIC_MEMBERSHIP_FOR_AUTHENTICATED_USER } from './orgs-remove-public-membership-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/remove-public-membership-for-authenticated-user',
  path: '/orgs/{org}/public_members/{username}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsRemovePublicMembershipForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REMOVE_PUBLIC_MEMBERSHIP_FOR_AUTHENTICATED_USER,
    'ORGS_REMOVE_PUBLIC_MEMBERSHIP_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
