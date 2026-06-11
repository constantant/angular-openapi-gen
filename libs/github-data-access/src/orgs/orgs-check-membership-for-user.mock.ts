import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CHECK_MEMBERSHIP_FOR_USER } from './orgs-check-membership-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/check-membership-for-user',
  path: '/orgs/{org}/members/{username}',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsCheckMembershipForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CHECK_MEMBERSHIP_FOR_USER,
    'ORGS_CHECK_MEMBERSHIP_FOR_USER',
    initialBehavior,
    _meta,
  );
}
