import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_PENDING_INVITATIONS_IN_ORG } from './teams-list-pending-invitations-in-org.token';
import type { TeamsListPendingInvitationsInOrgResponse } from './teams-list-pending-invitations-in-org.token';

export function provideTeamsListPendingInvitationsInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListPendingInvitationsInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_PENDING_INVITATIONS_IN_ORG,
    'TEAMS_LIST_PENDING_INVITATIONS_IN_ORG',
    initialBehavior,
  );
}
