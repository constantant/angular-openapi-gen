import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_CLONES } from './repos-get-clones.token';
import type { ReposGetClonesResponse } from './repos-get-clones.token';

export function provideReposGetClonesMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetClonesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_CLONES,
    'REPOS_GET_CLONES',
    initialBehavior,
  );
}
