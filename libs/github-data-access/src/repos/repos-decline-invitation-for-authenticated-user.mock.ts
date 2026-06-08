import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DECLINE_INVITATION_FOR_AUTHENTICATED_USER } from './repos-decline-invitation-for-authenticated-user.token';

export function provideReposDeclineInvitationForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DECLINE_INVITATION_FOR_AUTHENTICATED_USER,
    'REPOS_DECLINE_INVITATION_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
