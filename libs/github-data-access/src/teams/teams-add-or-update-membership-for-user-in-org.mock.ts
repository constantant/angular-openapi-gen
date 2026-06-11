import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_IN_ORG } from './teams-add-or-update-membership-for-user-in-org.token';
import type { TeamsAddOrUpdateMembershipForUserInOrgResponse } from './teams-add-or-update-membership-for-user-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/add-or-update-membership-for-user-in-org',
  path: '/orgs/{org}/teams/{team_slug}/memberships/{username}',
  method: 'put',
  tag: 'teams',
};

export function provideTeamsAddOrUpdateMembershipForUserInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsAddOrUpdateMembershipForUserInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_IN_ORG,
    'TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_IN_ORG',
    initialBehavior,
    _meta,
  );
}
