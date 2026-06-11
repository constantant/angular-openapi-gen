import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_PENDING_INVITATIONS_LEGACY } from './teams-list-pending-invitations-legacy.token';
import type { TeamsListPendingInvitationsLegacyResponse } from './teams-list-pending-invitations-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/list-pending-invitations-legacy',
  path: '/teams/{team_id}/invitations',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsListPendingInvitationsLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListPendingInvitationsLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_PENDING_INVITATIONS_LEGACY,
    'TEAMS_LIST_PENDING_INVITATIONS_LEGACY',
    initialBehavior,
    _meta,
  );
}
