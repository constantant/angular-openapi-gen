import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_ADD_MEMBER_LEGACY } from './teams-add-member-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/add-member-legacy',
  path: '/teams/{team_id}/members/{username}',
  method: 'put',
  tag: 'teams',
};

export function provideTeamsAddMemberLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_ADD_MEMBER_LEGACY,
    'TEAMS_ADD_MEMBER_LEGACY',
    initialBehavior,
    _meta,
  );
}
