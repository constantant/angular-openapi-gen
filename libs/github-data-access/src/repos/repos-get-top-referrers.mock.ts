import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_TOP_REFERRERS } from './repos-get-top-referrers.token';
import type { ReposGetTopReferrersResponse } from './repos-get-top-referrers.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-top-referrers',
  path: '/repos/{owner}/{repo}/traffic/popular/referrers',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetTopReferrersMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetTopReferrersResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_TOP_REFERRERS,
    'REPOS_GET_TOP_REFERRERS',
    initialBehavior,
    _meta,
  );
}
