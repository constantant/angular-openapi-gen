import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_TAGS } from './repos-list-tags.token';
import type { ReposListTagsResponse } from './repos-list-tags.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-tags',
  path: '/repos/{owner}/{repo}/tags',
  method: 'get',
  tag: 'repos',
};

export function provideReposListTagsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListTagsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_TAGS,
    'REPOS_LIST_TAGS',
    initialBehavior,
    _meta,
  );
}
