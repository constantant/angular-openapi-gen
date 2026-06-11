import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_AUTOLINK } from './repos-delete-autolink.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-autolink',
  path: '/repos/{owner}/{repo}/autolinks/{autolink_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteAutolinkMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_AUTOLINK,
    'REPOS_DELETE_AUTOLINK',
    initialBehavior,
    _meta,
  );
}
