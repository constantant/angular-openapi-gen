import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_CHECK_REPO_IS_STARRED_BY_AUTHENTICATED_USER } from './activity-check-repo-is-starred-by-authenticated-user.token';

export function provideActivityCheckRepoIsStarredByAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_CHECK_REPO_IS_STARRED_BY_AUTHENTICATED_USER,
    'ACTIVITY_CHECK_REPO_IS_STARRED_BY_AUTHENTICATED_USER',
    initialBehavior,
  );
}
