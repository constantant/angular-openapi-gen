import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION } from './repos-get-pull-request-review-protection.token';
import type { ReposGetPullRequestReviewProtectionResponse } from './repos-get-pull-request-review-protection.token';

export function provideReposGetPullRequestReviewProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetPullRequestReviewProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION,
    'REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION',
    initialBehavior,
  );
}
