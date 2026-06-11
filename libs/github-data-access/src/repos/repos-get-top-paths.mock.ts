import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_TOP_PATHS } from './repos-get-top-paths.token';
import type { ReposGetTopPathsResponse } from './repos-get-top-paths.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-top-paths',
  path: '/repos/{owner}/{repo}/traffic/popular/paths',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetTopPathsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetTopPathsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_TOP_PATHS,
    'REPOS_GET_TOP_PATHS',
    initialBehavior,
    _meta,
  );
}
