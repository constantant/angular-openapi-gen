import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposUpdateCommitComment,
  type ReposUpdateCommitCommentResponse,
} from './repos-update-commit-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-commit-comment',
  path: '/repos/{owner}/{repo}/comments/{comment_id}',
  method: 'patch',
  tag: 'repos',
};

export const REPOS_UPDATE_COMMIT_COMMENT_MOCK: MockEndpoint<ReposUpdateCommitCommentResponse> =
  {
    key: 'REPOS_UPDATE_COMMIT_COMMENT',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdateCommitComment,
  };

export function provideReposUpdateCommitCommentMock(
  initialBehavior?: MockEndpointBehavior<ReposUpdateCommitCommentResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_UPDATE_COMMIT_COMMENT_MOCK, initialBehavior);
}
