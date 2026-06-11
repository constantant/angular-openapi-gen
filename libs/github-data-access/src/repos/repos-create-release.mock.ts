import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_RELEASE } from './repos-create-release.token';
import type { ReposCreateReleaseResponse } from './repos-create-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-release',
  path: '/repos/{owner}/{repo}/releases',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateReleaseMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateReleaseResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_RELEASE,
    'REPOS_CREATE_RELEASE',
    initialBehavior,
    _meta,
  );
}
