import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_OR_UPDATE_FILE_CONTENTS } from './repos-create-or-update-file-contents.token';
import type { ReposCreateOrUpdateFileContentsResponse } from './repos-create-or-update-file-contents.token';

export function provideReposCreateOrUpdateFileContentsMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateOrUpdateFileContentsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_OR_UPDATE_FILE_CONTENTS,
    'REPOS_CREATE_OR_UPDATE_FILE_CONTENTS',
    initialBehavior,
  );
}
