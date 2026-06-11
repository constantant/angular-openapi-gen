import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_PENDING_INVITATIONS_IN_ORG } from './teams-list-pending-invitations-in-org.token';
import type { TeamsListPendingInvitationsInOrgResponse } from './teams-list-pending-invitations-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/list-pending-invitations-in-org',
  path: '/orgs/{org}/teams/{team_slug}/invitations',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsListPendingInvitationsInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListPendingInvitationsInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_PENDING_INVITATIONS_IN_ORG,
    'TEAMS_LIST_PENDING_INVITATIONS_IN_ORG',
    initialBehavior,
    _meta,
  );
}
