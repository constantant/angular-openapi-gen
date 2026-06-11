import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_DELETE_LEGACY } from './teams-delete-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/delete-legacy',
  path: '/teams/{team_id}',
  method: 'delete',
  tag: 'teams',
};

export function provideTeamsDeleteLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_DELETE_LEGACY,
    'TEAMS_DELETE_LEGACY',
    initialBehavior,
    _meta,
  );
}
