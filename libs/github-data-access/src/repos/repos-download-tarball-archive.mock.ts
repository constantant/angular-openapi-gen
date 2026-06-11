import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DOWNLOAD_TARBALL_ARCHIVE } from './repos-download-tarball-archive.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/download-tarball-archive',
  path: '/repos/{owner}/{repo}/tarball/{ref}',
  method: 'get',
  tag: 'repos',
};

export function provideReposDownloadTarballArchiveMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DOWNLOAD_TARBALL_ARCHIVE,
    'REPOS_DOWNLOAD_TARBALL_ARCHIVE',
    initialBehavior,
    _meta,
  );
}
