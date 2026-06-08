import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_IN_ORG } from './teams-add-or-update-membership-for-user-in-org.token';
import type { TeamsAddOrUpdateMembershipForUserInOrgResponse } from './teams-add-or-update-membership-for-user-in-org.token';

export function provideTeamsAddOrUpdateMembershipForUserInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsAddOrUpdateMembershipForUserInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_IN_ORG,
    'TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_IN_ORG',
    initialBehavior,
  );
}
