import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListCommitStatusesForRef,
  type ReposListCommitStatusesForRefResponse,
} from './repos-list-commit-statuses-for-ref.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-commit-statuses-for-ref',
  path: '/repos/{owner}/{repo}/commits/{ref}/statuses',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_COMMIT_STATUSES_FOR_REF_MOCK: MockEndpoint<ReposListCommitStatusesForRefResponse> =
  {
    key: 'REPOS_LIST_COMMIT_STATUSES_FOR_REF',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposListCommitStatusesForRef,
  };

export function provideReposListCommitStatusesForRefMock(
  initialBehavior?: MockEndpointBehavior<ReposListCommitStatusesForRefResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_LIST_COMMIT_STATUSES_FOR_REF_MOCK,
    initialBehavior,
  );
}
