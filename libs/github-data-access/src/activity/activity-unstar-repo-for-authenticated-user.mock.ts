import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_UNSTAR_REPO_FOR_AUTHENTICATED_USER } from './activity-unstar-repo-for-authenticated-user.token';

export function provideActivityUnstarRepoForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_UNSTAR_REPO_FOR_AUTHENTICATED_USER,
    'ACTIVITY_UNSTAR_REPO_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
