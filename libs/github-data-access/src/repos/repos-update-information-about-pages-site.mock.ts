import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE } from './repos-update-information-about-pages-site.token';

export function provideReposUpdateInformationAboutPagesSiteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE,
    'REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE',
    initialBehavior,
  );
}
