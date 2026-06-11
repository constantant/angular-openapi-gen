import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_PULL_REQUEST_REVIEW_PROTECTION } from './repos-delete-pull-request-review-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-pull-request-review-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeletePullRequestReviewProtectionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_PULL_REQUEST_REVIEW_PROTECTION,
    'REPOS_DELETE_PULL_REQUEST_REVIEW_PROTECTION',
    initialBehavior,
    _meta,
  );
}
