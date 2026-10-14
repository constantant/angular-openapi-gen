import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposReplaceAllTopics,
  type ReposReplaceAllTopicsResponse,
} from './repos-replace-all-topics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/replace-all-topics',
  path: '/repos/{owner}/{repo}/topics',
  method: 'put',
  tag: 'repos',
};

export const REPOS_REPLACE_ALL_TOPICS_MOCK: MockEndpoint<ReposReplaceAllTopicsResponse> =
  {
    key: 'REPOS_REPLACE_ALL_TOPICS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposReplaceAllTopics,
  };

export function provideReposReplaceAllTopicsMock(
  initialBehavior?: MockEndpointBehavior<ReposReplaceAllTopicsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_REPLACE_ALL_TOPICS_MOCK, initialBehavior);
}
