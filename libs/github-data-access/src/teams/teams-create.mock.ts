import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_CREATE } from './teams-create.token';
import type { TeamsCreateResponse } from './teams-create.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/create',
  path: '/orgs/{org}/teams',
  method: 'post',
  tag: 'teams',
};

export function provideTeamsCreateMock(
  initialBehavior?: ProviderInitialBehavior<TeamsCreateResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_CREATE,
    'TEAMS_CREATE',
    initialBehavior,
    _meta,
  );
}
