import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_GET_MEMBERSHIP_FOR_AUTHENTICATED_USER } from './orgs-get-membership-for-authenticated-user.token';
import type { OrgsGetMembershipForAuthenticatedUserResponse } from './orgs-get-membership-for-authenticated-user.token';

export function provideOrgsGetMembershipForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetMembershipForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_MEMBERSHIP_FOR_AUTHENTICATED_USER,
    'ORGS_GET_MEMBERSHIP_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
