import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_REMOVE_MEMBERSHIP_FOR_USER_IN_ORG } from './teams-remove-membership-for-user-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/remove-membership-for-user-in-org',
  path: '/orgs/{org}/teams/{team_slug}/memberships/{username}',
  method: 'delete',
  tag: 'teams',
};

export function provideTeamsRemoveMembershipForUserInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_REMOVE_MEMBERSHIP_FOR_USER_IN_ORG,
    'TEAMS_REMOVE_MEMBERSHIP_FOR_USER_IN_ORG',
    initialBehavior,
    _meta,
  );
}
