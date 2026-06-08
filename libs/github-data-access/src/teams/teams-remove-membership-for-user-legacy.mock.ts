import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_REMOVE_MEMBERSHIP_FOR_USER_LEGACY } from './teams-remove-membership-for-user-legacy.token';

export function provideTeamsRemoveMembershipForUserLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_REMOVE_MEMBERSHIP_FOR_USER_LEGACY,
    'TEAMS_REMOVE_MEMBERSHIP_FOR_USER_LEGACY',
    initialBehavior,
  );
}
