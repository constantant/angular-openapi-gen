import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_GET_BLOB } from './git-get-blob.token';
import type { GitGetBlobResponse } from './git-get-blob.token';

export function provideGitGetBlobMock(
  initialBehavior?: ProviderInitialBehavior<GitGetBlobResponse>,
): FactoryProvider {
  return provideMockResource(GIT_GET_BLOB, 'GIT_GET_BLOB', initialBehavior);
}
