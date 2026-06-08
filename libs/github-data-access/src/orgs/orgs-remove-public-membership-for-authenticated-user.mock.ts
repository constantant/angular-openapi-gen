import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REMOVE_PUBLIC_MEMBERSHIP_FOR_AUTHENTICATED_USER } from './orgs-remove-public-membership-for-authenticated-user.token';

export function provideOrgsRemovePublicMembershipForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REMOVE_PUBLIC_MEMBERSHIP_FOR_AUTHENTICATED_USER,
    'ORGS_REMOVE_PUBLIC_MEMBERSHIP_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
