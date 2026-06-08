import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_SET_MEMBERSHIP_FOR_USER } from './orgs-set-membership-for-user.token';
import type { OrgsSetMembershipForUserResponse } from './orgs-set-membership-for-user.token';

export function provideOrgsSetMembershipForUserMock(
  initialBehavior?: ProviderInitialBehavior<OrgsSetMembershipForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_SET_MEMBERSHIP_FOR_USER,
    'ORGS_SET_MEMBERSHIP_FOR_USER',
    initialBehavior,
  );
}
