import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetReleaseByTag,
  type ReposGetReleaseByTagResponse,
} from './repos-get-release-by-tag.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-release-by-tag',
  path: '/repos/{owner}/{repo}/releases/tags/{tag}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_RELEASE_BY_TAG_MOCK: MockEndpoint<ReposGetReleaseByTagResponse> =
  {
    key: 'REPOS_GET_RELEASE_BY_TAG',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetReleaseByTag,
  };

export function provideReposGetReleaseByTagMock(
  initialBehavior?: MockEndpointBehavior<ReposGetReleaseByTagResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_RELEASE_BY_TAG_MOCK, initialBehavior);
}
