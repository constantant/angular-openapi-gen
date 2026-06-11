import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST } from './teams-list.token';
import type { TeamsListResponse } from './teams-list.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/list',
  path: '/orgs/{org}/teams',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsListMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListResponse>,
): FactoryProvider {
  return provideMockResource(TEAMS_LIST, 'TEAMS_LIST', initialBehavior, _meta);
}
