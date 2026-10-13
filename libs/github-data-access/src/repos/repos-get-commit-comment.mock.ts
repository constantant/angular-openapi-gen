import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetCommitComment,
  type ReposGetCommitCommentResponse,
} from './repos-get-commit-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-commit-comment',
  path: '/repos/{owner}/{repo}/comments/{comment_id}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_COMMIT_COMMENT_MOCK: MockEndpoint<ReposGetCommitCommentResponse> =
  {
    key: 'REPOS_GET_COMMIT_COMMENT',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetCommitComment,
  };

export function provideReposGetCommitCommentMock(
  initialBehavior?: MockEndpointBehavior<ReposGetCommitCommentResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_COMMIT_COMMENT_MOCK, initialBehavior);
}
