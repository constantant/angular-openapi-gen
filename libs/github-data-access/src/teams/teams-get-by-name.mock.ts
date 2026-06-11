import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_GET_BY_NAME } from './teams-get-by-name.token';
import type { TeamsGetByNameResponse } from './teams-get-by-name.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/get-by-name',
  path: '/orgs/{org}/teams/{team_slug}',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsGetByNameMock(
  initialBehavior?: ProviderInitialBehavior<TeamsGetByNameResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_GET_BY_NAME,
    'TEAMS_GET_BY_NAME',
    initialBehavior,
    _meta,
  );
}
