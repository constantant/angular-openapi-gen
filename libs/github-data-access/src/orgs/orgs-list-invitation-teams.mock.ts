import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_INVITATION_TEAMS } from './orgs-list-invitation-teams.token';
import type { OrgsListInvitationTeamsResponse } from './orgs-list-invitation-teams.token';

export function provideOrgsListInvitationTeamsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListInvitationTeamsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_INVITATION_TEAMS,
    'ORGS_LIST_INVITATION_TEAMS',
    initialBehavior,
  );
}
