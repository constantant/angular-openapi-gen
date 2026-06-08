import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DOWNLOAD_ZIPBALL_ARCHIVE } from './repos-download-zipball-archive.token';

export function provideReposDownloadZipballArchiveMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DOWNLOAD_ZIPBALL_ARCHIVE,
    'REPOS_DOWNLOAD_ZIPBALL_ARCHIVE',
    initialBehavior,
  );
}
