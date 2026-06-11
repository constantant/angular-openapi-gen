import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_GET_LEGACY } from './teams-get-legacy.token';
import type { TeamsGetLegacyResponse } from './teams-get-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/get-legacy',
  path: '/teams/{team_id}',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsGetLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsGetLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_GET_LEGACY,
    'TEAMS_GET_LEGACY',
    initialBehavior,
    _meta,
  );
}
