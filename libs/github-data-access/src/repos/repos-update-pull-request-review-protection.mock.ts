import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION } from './repos-update-pull-request-review-protection.token';
import type { ReposUpdatePullRequestReviewProtectionResponse } from './repos-update-pull-request-review-protection.token';

export function provideReposUpdatePullRequestReviewProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdatePullRequestReviewProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION,
    'REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION',
    initialBehavior,
  );
}
