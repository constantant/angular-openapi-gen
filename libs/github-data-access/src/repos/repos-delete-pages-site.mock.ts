import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDeletePagesSite } from './repos-delete-pages-site.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-pages-site',
  path: '/repos/{owner}/{repo}/pages',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DELETE_PAGES_SITE_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DELETE_PAGES_SITE',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDeletePagesSite,
};

export function provideReposDeletePagesSiteMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_DELETE_PAGES_SITE_MOCK, initialBehavior);
}
