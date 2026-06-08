import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CHECK_PUBLIC_MEMBERSHIP_FOR_USER } from './orgs-check-public-membership-for-user.token';

export function provideOrgsCheckPublicMembershipForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CHECK_PUBLIC_MEMBERSHIP_FOR_USER,
    'ORGS_CHECK_PUBLIC_MEMBERSHIP_FOR_USER',
    initialBehavior,
  );
}
