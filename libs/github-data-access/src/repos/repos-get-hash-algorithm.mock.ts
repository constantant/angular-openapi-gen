import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_HASH_ALGORITHM } from './repos-get-hash-algorithm.token';
import type { ReposGetHashAlgorithmResponse } from './repos-get-hash-algorithm.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-hash-algorithm',
  path: '/repos/{owner}/{repo}/hash-algorithm',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetHashAlgorithmMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetHashAlgorithmResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_HASH_ALGORITHM,
    'REPOS_GET_HASH_ALGORITHM',
    initialBehavior,
    _meta,
  );
}
