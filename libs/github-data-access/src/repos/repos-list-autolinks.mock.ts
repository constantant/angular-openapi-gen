import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_AUTOLINKS } from './repos-list-autolinks.token';
import type { ReposListAutolinksResponse } from './repos-list-autolinks.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-autolinks',
  path: '/repos/{owner}/{repo}/autolinks',
  method: 'get',
  tag: 'repos',
};

export function provideReposListAutolinksMock(
  initialBehavior?: ProviderInitialBehavior<ReposListAutolinksResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_AUTOLINKS,
    'REPOS_LIST_AUTOLINKS',
    initialBehavior,
    _meta,
    options,
  );
}
