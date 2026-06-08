import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_PENDING_INVITATIONS } from './orgs-list-pending-invitations.token';
import type { OrgsListPendingInvitationsResponse } from './orgs-list-pending-invitations.token';

export function provideOrgsListPendingInvitationsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListPendingInvitationsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_PENDING_INVITATIONS,
    'ORGS_LIST_PENDING_INVITATIONS',
    initialBehavior,
  );
}
