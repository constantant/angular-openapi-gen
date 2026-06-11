import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_CONTRIBUTORS } from './repos-list-contributors.token';
import type { ReposListContributorsResponse } from './repos-list-contributors.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-contributors',
  path: '/repos/{owner}/{repo}/contributors',
  method: 'get',
  tag: 'repos',
};

export function provideReposListContributorsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListContributorsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_CONTRIBUTORS,
    'REPOS_LIST_CONTRIBUTORS',
    initialBehavior,
    _meta,
  );
}
