import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DOWNLOAD_ZIPBALL_ARCHIVE } from './repos-download-zipball-archive.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/download-zipball-archive',
  path: '/repos/{owner}/{repo}/zipball/{ref}',
  method: 'get',
  tag: 'repos',
};

export function provideReposDownloadZipballArchiveMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DOWNLOAD_ZIPBALL_ARCHIVE,
    'REPOS_DOWNLOAD_ZIPBALL_ARCHIVE',
    initialBehavior,
    _meta,
  );
}
