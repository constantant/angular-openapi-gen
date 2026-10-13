import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposUpdatePullRequestReviewProtection,
  type ReposUpdatePullRequestReviewProtectionResponse,
} from './repos-update-pull-request-review-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-pull-request-review-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews',
  method: 'patch',
  tag: 'repos',
};

export const REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION_MOCK: MockEndpoint<ReposUpdatePullRequestReviewProtectionResponse> =
  {
    key: 'REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdatePullRequestReviewProtection,
  };

export function provideReposUpdatePullRequestReviewProtectionMock(
  initialBehavior?: MockEndpointBehavior<ReposUpdatePullRequestReviewProtectionResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION_MOCK,
    initialBehavior,
  );
}
