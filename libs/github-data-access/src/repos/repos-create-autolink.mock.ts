import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_AUTOLINK } from './repos-create-autolink.token';
import type { ReposCreateAutolinkResponse } from './repos-create-autolink.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-autolink',
  path: '/repos/{owner}/{repo}/autolinks',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateAutolinkMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateAutolinkResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_AUTOLINK,
    'REPOS_CREATE_AUTOLINK',
    initialBehavior,
    _meta,
  );
}
