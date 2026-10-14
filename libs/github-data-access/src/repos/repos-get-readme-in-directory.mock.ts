import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetReadmeInDirectory,
  type ReposGetReadmeInDirectoryResponse,
} from './repos-get-readme-in-directory.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-readme-in-directory',
  path: '/repos/{owner}/{repo}/readme/{dir}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_README_IN_DIRECTORY_MOCK: MockEndpoint<ReposGetReadmeInDirectoryResponse> =
  {
    key: 'REPOS_GET_README_IN_DIRECTORY',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetReadmeInDirectory,
  };

export function provideReposGetReadmeInDirectoryMock(
  initialBehavior?: MockEndpointBehavior<ReposGetReadmeInDirectoryResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_README_IN_DIRECTORY_MOCK,
    initialBehavior,
  );
}
