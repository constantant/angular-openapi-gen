import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_ACCEPT_INVITATION_FOR_AUTHENTICATED_USER } from './repos-accept-invitation-for-authenticated-user.token';

export function provideReposAcceptInvitationForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ACCEPT_INVITATION_FOR_AUTHENTICATED_USER,
    'REPOS_ACCEPT_INVITATION_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
