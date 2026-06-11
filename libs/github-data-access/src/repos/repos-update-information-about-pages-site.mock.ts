import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE } from './repos-update-information-about-pages-site.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-information-about-pages-site',
  path: '/repos/{owner}/{repo}/pages',
  method: 'put',
  tag: 'repos',
};

export function provideReposUpdateInformationAboutPagesSiteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE,
    'REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE',
    initialBehavior,
    _meta,
  );
}
