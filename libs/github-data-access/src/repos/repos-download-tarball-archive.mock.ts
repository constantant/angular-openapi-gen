import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DOWNLOAD_TARBALL_ARCHIVE } from './repos-download-tarball-archive.token';

export function provideReposDownloadTarballArchiveMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DOWNLOAD_TARBALL_ARCHIVE,
    'REPOS_DOWNLOAD_TARBALL_ARCHIVE',
    initialBehavior,
  );
}
