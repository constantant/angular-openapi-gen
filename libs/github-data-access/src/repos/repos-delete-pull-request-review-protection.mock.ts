import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_PULL_REQUEST_REVIEW_PROTECTION } from './repos-delete-pull-request-review-protection.token';

export function provideReposDeletePullRequestReviewProtectionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_PULL_REQUEST_REVIEW_PROTECTION,
    'REPOS_DELETE_PULL_REQUEST_REVIEW_PROTECTION',
    initialBehavior,
  );
}
