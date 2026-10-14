import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposUpdateInformationAboutPagesSite } from './repos-update-information-about-pages-site.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-information-about-pages-site',
  path: '/repos/{owner}/{repo}/pages',
  method: 'put',
  tag: 'repos',
};

export const REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE_MOCK: MockEndpoint<unknown> =
  {
    key: 'REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdateInformationAboutPagesSite,
  };

export function provideReposUpdateInformationAboutPagesSiteMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE_MOCK,
    initialBehavior,
  );
}
