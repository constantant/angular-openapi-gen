import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION } from './repos-update-pull-request-review-protection.token';
import type { ReposUpdatePullRequestReviewProtectionResponse } from './repos-update-pull-request-review-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-pull-request-review-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews',
  method: 'patch',
  tag: 'repos',
};

export function provideReposUpdatePullRequestReviewProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdatePullRequestReviewProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION,
    'REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION',
    initialBehavior,
    _meta,
  );
}
