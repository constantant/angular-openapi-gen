import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreateOrUpdateFileContents,
  type ReposCreateOrUpdateFileContentsResponse,
} from './repos-create-or-update-file-contents.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-or-update-file-contents',
  path: '/repos/{owner}/{repo}/contents/{path}',
  method: 'put',
  tag: 'repos',
};

export const REPOS_CREATE_OR_UPDATE_FILE_CONTENTS_MOCK: MockEndpoint<ReposCreateOrUpdateFileContentsResponse> =
  {
    key: 'REPOS_CREATE_OR_UPDATE_FILE_CONTENTS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreateOrUpdateFileContents,
  };

export function provideReposCreateOrUpdateFileContentsMock(
  initialBehavior?: MockEndpointBehavior<ReposCreateOrUpdateFileContentsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_CREATE_OR_UPDATE_FILE_CONTENTS_MOCK,
    initialBehavior,
  );
}
