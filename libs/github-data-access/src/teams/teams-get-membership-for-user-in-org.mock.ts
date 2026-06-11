import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_GET_MEMBERSHIP_FOR_USER_IN_ORG } from './teams-get-membership-for-user-in-org.token';
import type { TeamsGetMembershipForUserInOrgResponse } from './teams-get-membership-for-user-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/get-membership-for-user-in-org',
  path: '/orgs/{org}/teams/{team_slug}/memberships/{username}',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsGetMembershipForUserInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsGetMembershipForUserInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_GET_MEMBERSHIP_FOR_USER_IN_ORG,
    'TEAMS_GET_MEMBERSHIP_FOR_USER_IN_ORG',
    initialBehavior,
    _meta,
  );
}
