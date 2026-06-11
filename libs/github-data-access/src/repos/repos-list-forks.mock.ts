import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_FORKS } from './repos-list-forks.token';
import type { ReposListForksResponse } from './repos-list-forks.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-forks',
  path: '/repos/{owner}/{repo}/forks',
  method: 'get',
  tag: 'repos',
};

export function provideReposListForksMock(
  initialBehavior?: ProviderInitialBehavior<ReposListForksResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_FORKS,
    'REPOS_LIST_FORKS',
    initialBehavior,
    _meta,
  );
}
