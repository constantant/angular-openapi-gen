import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_REMOVE_MEMBERSHIP_FOR_USER_IN_ORG } from './teams-remove-membership-for-user-in-org.token';

export function provideTeamsRemoveMembershipForUserInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_REMOVE_MEMBERSHIP_FOR_USER_IN_ORG,
    'TEAMS_REMOVE_MEMBERSHIP_FOR_USER_IN_ORG',
    initialBehavior,
  );
}
