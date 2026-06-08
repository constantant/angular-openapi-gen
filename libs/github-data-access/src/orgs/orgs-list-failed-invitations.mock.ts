import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_FAILED_INVITATIONS } from './orgs-list-failed-invitations.token';
import type { OrgsListFailedInvitationsResponse } from './orgs-list-failed-invitations.token';

export function provideOrgsListFailedInvitationsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListFailedInvitationsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_FAILED_INVITATIONS,
    'ORGS_LIST_FAILED_INVITATIONS',
    initialBehavior,
  );
}
