import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE } from './repos-update.token';
import type { ReposUpdateResponse } from './repos-update.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update',
  path: '/repos/{owner}/{repo}',
  method: 'patch',
  tag: 'repos',
};

export function provideReposUpdateMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE,
    'REPOS_UPDATE',
    initialBehavior,
    _meta,
    options,
  );
}
