import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CANCEL_INVITATION } from './orgs-cancel-invitation.token';

export function provideOrgsCancelInvitationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CANCEL_INVITATION,
    'ORGS_CANCEL_INVITATION',
    initialBehavior,
  );
}
