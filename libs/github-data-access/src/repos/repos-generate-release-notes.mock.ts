import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GENERATE_RELEASE_NOTES } from './repos-generate-release-notes.token';
import type { ReposGenerateReleaseNotesResponse } from './repos-generate-release-notes.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/generate-release-notes',
  path: '/repos/{owner}/{repo}/releases/generate-notes',
  method: 'post',
  tag: 'repos',
};

export function provideReposGenerateReleaseNotesMock(
  initialBehavior?: ProviderInitialBehavior<ReposGenerateReleaseNotesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GENERATE_RELEASE_NOTES,
    'REPOS_GENERATE_RELEASE_NOTES',
    initialBehavior,
    _meta,
  );
}
