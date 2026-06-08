import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_GET_MEMBERSHIP_FOR_USER_LEGACY } from './teams-get-membership-for-user-legacy.token';
import type { TeamsGetMembershipForUserLegacyResponse } from './teams-get-membership-for-user-legacy.token';

export function provideTeamsGetMembershipForUserLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsGetMembershipForUserLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_GET_MEMBERSHIP_FOR_USER_LEGACY,
    'TEAMS_GET_MEMBERSHIP_FOR_USER_LEGACY',
    initialBehavior,
  );
}
