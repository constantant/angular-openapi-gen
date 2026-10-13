import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGenerateReleaseNotes,
  type ReposGenerateReleaseNotesResponse,
} from './repos-generate-release-notes.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/generate-release-notes',
  path: '/repos/{owner}/{repo}/releases/generate-notes',
  method: 'post',
  tag: 'repos',
};

export const REPOS_GENERATE_RELEASE_NOTES_MOCK: MockEndpoint<ReposGenerateReleaseNotesResponse> =
  {
    key: 'REPOS_GENERATE_RELEASE_NOTES',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGenerateReleaseNotes,
  };

export function provideReposGenerateReleaseNotesMock(
  initialBehavior?: MockEndpointBehavior<ReposGenerateReleaseNotesResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GENERATE_RELEASE_NOTES_MOCK,
    initialBehavior,
  );
}
