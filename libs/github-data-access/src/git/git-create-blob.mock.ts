import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_CREATE_BLOB } from './git-create-blob.token';
import type { GitCreateBlobResponse } from './git-create-blob.token';

export function provideGitCreateBlobMock(
  initialBehavior?: ProviderInitialBehavior<GitCreateBlobResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_CREATE_BLOB,
    'GIT_CREATE_BLOB',
    initialBehavior,
  );
}
