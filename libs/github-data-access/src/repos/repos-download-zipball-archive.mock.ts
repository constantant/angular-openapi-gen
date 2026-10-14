import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDownloadZipballArchive } from './repos-download-zipball-archive.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/download-zipball-archive',
  path: '/repos/{owner}/{repo}/zipball/{ref}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_DOWNLOAD_ZIPBALL_ARCHIVE_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DOWNLOAD_ZIPBALL_ARCHIVE',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDownloadZipballArchive,
};

export function provideReposDownloadZipballArchiveMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_DOWNLOAD_ZIPBALL_ARCHIVE_MOCK,
    initialBehavior,
  );
}
