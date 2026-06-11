import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_REMOVE_MEMBER_LEGACY } from './teams-remove-member-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/remove-member-legacy',
  path: '/teams/{team_id}/members/{username}',
  method: 'delete',
  tag: 'teams',
};

export function provideTeamsRemoveMemberLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_REMOVE_MEMBER_LEGACY,
    'TEAMS_REMOVE_MEMBER_LEGACY',
    initialBehavior,
    _meta,
  );
}
