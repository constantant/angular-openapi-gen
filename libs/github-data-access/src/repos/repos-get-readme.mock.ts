import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_README } from './repos-get-readme.token';
import type { ReposGetReadmeResponse } from './repos-get-readme.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-readme',
  path: '/repos/{owner}/{repo}/readme',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetReadmeMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetReadmeResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_README,
    'REPOS_GET_README',
    initialBehavior,
    _meta,
  );
}
