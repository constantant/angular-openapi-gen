import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDownloadTarballArchive } from './repos-download-tarball-archive.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/download-tarball-archive',
  path: '/repos/{owner}/{repo}/tarball/{ref}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_DOWNLOAD_TARBALL_ARCHIVE_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DOWNLOAD_TARBALL_ARCHIVE',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDownloadTarballArchive,
};

export function provideReposDownloadTarballArchiveMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_DOWNLOAD_TARBALL_ARCHIVE_MOCK,
    initialBehavior,
  );
}
