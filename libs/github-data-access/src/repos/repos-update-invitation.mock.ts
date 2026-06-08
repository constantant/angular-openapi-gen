import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_INVITATION } from './repos-update-invitation.token';
import type { ReposUpdateInvitationResponse } from './repos-update-invitation.token';

export function provideReposUpdateInvitationMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateInvitationResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_INVITATION,
    'REPOS_UPDATE_INVITATION',
    initialBehavior,
  );
}
