import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REMOVE_MEMBERSHIP_FOR_USER } from './orgs-remove-membership-for-user.token';

export function provideOrgsRemoveMembershipForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REMOVE_MEMBERSHIP_FOR_USER,
    'ORGS_REMOVE_MEMBERSHIP_FOR_USER',
    initialBehavior,
  );
}
