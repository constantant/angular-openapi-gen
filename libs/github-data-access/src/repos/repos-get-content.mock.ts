import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_CONTENT } from './repos-get-content.token';
import type { ReposGetContentResponse } from './repos-get-content.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-content',
  path: '/repos/{owner}/{repo}/contents/{path}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetContentMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetContentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_CONTENT,
    'REPOS_GET_CONTENT',
    initialBehavior,
    _meta,
  );
}
