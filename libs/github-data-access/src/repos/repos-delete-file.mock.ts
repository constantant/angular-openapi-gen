import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_FILE } from './repos-delete-file.token';
import type { ReposDeleteFileResponse } from './repos-delete-file.token';

export function provideReposDeleteFileMock(
  initialBehavior?: ProviderInitialBehavior<ReposDeleteFileResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_FILE,
    'REPOS_DELETE_FILE',
    initialBehavior,
  );
}
