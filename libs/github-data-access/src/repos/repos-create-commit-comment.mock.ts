import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreateCommitComment,
  type ReposCreateCommitCommentResponse,
} from './repos-create-commit-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-commit-comment',
  path: '/repos/{owner}/{repo}/commits/{commit_sha}/comments',
  method: 'post',
  tag: 'repos',
};

export const REPOS_CREATE_COMMIT_COMMENT_MOCK: MockEndpoint<ReposCreateCommitCommentResponse> =
  {
    key: 'REPOS_CREATE_COMMIT_COMMENT',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreateCommitComment,
  };

export function provideReposCreateCommitCommentMock(
  initialBehavior?: MockEndpointBehavior<ReposCreateCommitCommentResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_CREATE_COMMIT_COMMENT_MOCK, initialBehavior);
}
