import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetPullRequestReviewProtection,
  type ReposGetPullRequestReviewProtectionResponse,
} from './repos-get-pull-request-review-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-pull-request-review-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION_MOCK: MockEndpoint<ReposGetPullRequestReviewProtectionResponse> =
  {
    key: 'REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetPullRequestReviewProtection,
  };

export function provideReposGetPullRequestReviewProtectionMock(
  initialBehavior?: MockEndpointBehavior<ReposGetPullRequestReviewProtectionResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION_MOCK,
    initialBehavior,
  );
}
