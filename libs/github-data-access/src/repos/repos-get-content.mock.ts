import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_CONTENT } from './repos-get-content.token';
import type { ReposGetContentResponse } from './repos-get-content.token';

export function provideReposGetContentMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetContentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_CONTENT,
    'REPOS_GET_CONTENT',
    initialBehavior,
  );
}
