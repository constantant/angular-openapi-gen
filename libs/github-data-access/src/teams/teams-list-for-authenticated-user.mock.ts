import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_FOR_AUTHENTICATED_USER } from './teams-list-for-authenticated-user.token';
import type { TeamsListForAuthenticatedUserResponse } from './teams-list-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/list-for-authenticated-user',
  path: '/user/teams',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsListForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_FOR_AUTHENTICATED_USER,
    'TEAMS_LIST_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
