import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_INVITATION_TEAMS } from './orgs-list-invitation-teams.token';
import type { OrgsListInvitationTeamsResponse } from './orgs-list-invitation-teams.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-invitation-teams',
  path: '/orgs/{org}/invitations/{invitation_id}/teams',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListInvitationTeamsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListInvitationTeamsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_INVITATION_TEAMS,
    'ORGS_LIST_INVITATION_TEAMS',
    initialBehavior,
    _meta,
  );
}
