import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_HASH_ALGORITHM } from './repos-get-hash-algorithm.token';
import type { ReposGetHashAlgorithmResponse } from './repos-get-hash-algorithm.token';

export function provideReposGetHashAlgorithmMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetHashAlgorithmResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_HASH_ALGORITHM,
    'REPOS_GET_HASH_ALGORITHM',
    initialBehavior,
  );
}
