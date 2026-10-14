import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreatePagesSite,
  type ReposCreatePagesSiteResponse,
} from './repos-create-pages-site.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-pages-site',
  path: '/repos/{owner}/{repo}/pages',
  method: 'post',
  tag: 'repos',
};

export const REPOS_CREATE_PAGES_SITE_MOCK: MockEndpoint<ReposCreatePagesSiteResponse> =
  {
    key: 'REPOS_CREATE_PAGES_SITE',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreatePagesSite,
  };

export function provideReposCreatePagesSiteMock(
  initialBehavior?: MockEndpointBehavior<ReposCreatePagesSiteResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_CREATE_PAGES_SITE_MOCK, initialBehavior);
}
