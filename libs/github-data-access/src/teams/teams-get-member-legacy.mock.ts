import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_GET_MEMBER_LEGACY } from './teams-get-member-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/get-member-legacy',
  path: '/teams/{team_id}/members/{username}',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsGetMemberLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_GET_MEMBER_LEGACY,
    'TEAMS_GET_MEMBER_LEGACY',
    initialBehavior,
    _meta,
  );
}
