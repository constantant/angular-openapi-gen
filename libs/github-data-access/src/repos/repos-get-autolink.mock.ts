import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_AUTOLINK } from './repos-get-autolink.token';
import type { ReposGetAutolinkResponse } from './repos-get-autolink.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-autolink',
  path: '/repos/{owner}/{repo}/autolinks/{autolink_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetAutolinkMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAutolinkResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_AUTOLINK,
    'REPOS_GET_AUTOLINK',
    initialBehavior,
    _meta,
  );
}
