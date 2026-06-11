import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_MEMBERS_LEGACY } from './teams-list-members-legacy.token';
import type { TeamsListMembersLegacyResponse } from './teams-list-members-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/list-members-legacy',
  path: '/teams/{team_id}/members',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsListMembersLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListMembersLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_MEMBERS_LEGACY,
    'TEAMS_LIST_MEMBERS_LEGACY',
    initialBehavior,
    _meta,
  );
}
