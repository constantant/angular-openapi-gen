import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_PUBLIC } from './repos-list-public.token';
import type { ReposListPublicResponse } from './repos-list-public.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-public',
  path: '/repositories',
  method: 'get',
  tag: 'repos',
};

export function provideReposListPublicMock(
  initialBehavior?: ProviderInitialBehavior<ReposListPublicResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_PUBLIC,
    'REPOS_LIST_PUBLIC',
    initialBehavior,
    _meta,
  );
}
