import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_UPDATE_LEGACY } from './teams-update-legacy.token';
import type { TeamsUpdateLegacyResponse } from './teams-update-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/update-legacy',
  path: '/teams/{team_id}',
  method: 'patch',
  tag: 'teams',
};

export function provideTeamsUpdateLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsUpdateLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_UPDATE_LEGACY,
    'TEAMS_UPDATE_LEGACY',
    initialBehavior,
    _meta,
  );
}
