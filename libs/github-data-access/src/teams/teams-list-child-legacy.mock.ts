import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_CHILD_LEGACY } from './teams-list-child-legacy.token';
import type { TeamsListChildLegacyResponse } from './teams-list-child-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/list-child-legacy',
  path: '/teams/{team_id}/teams',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsListChildLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListChildLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_CHILD_LEGACY,
    'TEAMS_LIST_CHILD_LEGACY',
    initialBehavior,
    _meta,
  );
}
