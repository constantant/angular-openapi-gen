import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET } from './repos-get.token';
import type { ReposGetResponse } from './repos-get.token';

export function provideReposGetMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetResponse>,
): FactoryProvider {
  return provideMockResource(REPOS_GET, 'REPOS_GET', initialBehavior);
}
