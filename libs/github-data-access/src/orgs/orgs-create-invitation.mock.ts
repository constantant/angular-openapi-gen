import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CREATE_INVITATION } from './orgs-create-invitation.token';
import type { OrgsCreateInvitationResponse } from './orgs-create-invitation.token';

export function provideOrgsCreateInvitationMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCreateInvitationResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CREATE_INVITATION,
    'ORGS_CREATE_INVITATION',
    initialBehavior,
  );
}
