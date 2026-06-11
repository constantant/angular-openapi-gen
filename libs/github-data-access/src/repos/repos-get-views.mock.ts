import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_VIEWS } from './repos-get-views.token';
import type { ReposGetViewsResponse } from './repos-get-views.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-views',
  path: '/repos/{owner}/{repo}/traffic/views',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetViewsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetViewsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_VIEWS,
    'REPOS_GET_VIEWS',
    initialBehavior,
    _meta,
  );
}
