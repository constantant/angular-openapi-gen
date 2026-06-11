import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_LEGACY } from './teams-add-or-update-membership-for-user-legacy.token';
import type { TeamsAddOrUpdateMembershipForUserLegacyResponse } from './teams-add-or-update-membership-for-user-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/add-or-update-membership-for-user-legacy',
  path: '/teams/{team_id}/memberships/{username}',
  method: 'put',
  tag: 'teams',
};

export function provideTeamsAddOrUpdateMembershipForUserLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsAddOrUpdateMembershipForUserLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_LEGACY,
    'TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_LEGACY',
    initialBehavior,
    _meta,
  );
}
