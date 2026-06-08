import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_INVITATION } from './repos-delete-invitation.token';

export function provideReposDeleteInvitationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_INVITATION,
    'REPOS_DELETE_INVITATION',
    initialBehavior,
  );
}
