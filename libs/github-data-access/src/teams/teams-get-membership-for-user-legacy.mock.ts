import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_GET_MEMBERSHIP_FOR_USER_LEGACY } from './teams-get-membership-for-user-legacy.token';
import type { TeamsGetMembershipForUserLegacyResponse } from './teams-get-membership-for-user-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/get-membership-for-user-legacy',
  path: '/teams/{team_id}/memberships/{username}',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsGetMembershipForUserLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsGetMembershipForUserLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_GET_MEMBERSHIP_FOR_USER_LEGACY,
    'TEAMS_GET_MEMBERSHIP_FOR_USER_LEGACY',
    initialBehavior,
    _meta,
  );
}
