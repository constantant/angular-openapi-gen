import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_GET_MEMBERSHIP_FOR_USER } from './orgs-get-membership-for-user.token';
import type { OrgsGetMembershipForUserResponse } from './orgs-get-membership-for-user.token';

export function provideOrgsGetMembershipForUserMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetMembershipForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_MEMBERSHIP_FOR_USER,
    'ORGS_GET_MEMBERSHIP_FOR_USER',
    initialBehavior,
  );
}
