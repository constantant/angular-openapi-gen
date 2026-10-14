import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListPullRequestsAssociatedWithCommit,
  type ReposListPullRequestsAssociatedWithCommitResponse,
} from './repos-list-pull-requests-associated-with-commit.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-pull-requests-associated-with-commit',
  path: '/repos/{owner}/{repo}/commits/{commit_sha}/pulls',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT_MOCK: MockEndpoint<ReposListPullRequestsAssociatedWithCommitResponse> =
  {
    key: 'REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposListPullRequestsAssociatedWithCommit,
  };

export function provideReposListPullRequestsAssociatedWithCommitMock(
  initialBehavior?: MockEndpointBehavior<ReposListPullRequestsAssociatedWithCommitResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT_MOCK,
    initialBehavior,
  );
}
