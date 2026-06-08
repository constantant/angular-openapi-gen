import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GENERATE_RELEASE_NOTES } from './repos-generate-release-notes.token';
import type { ReposGenerateReleaseNotesResponse } from './repos-generate-release-notes.token';

export function provideReposGenerateReleaseNotesMock(
  initialBehavior?: ProviderInitialBehavior<ReposGenerateReleaseNotesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GENERATE_RELEASE_NOTES,
    'REPOS_GENERATE_RELEASE_NOTES',
    initialBehavior,
  );
}
