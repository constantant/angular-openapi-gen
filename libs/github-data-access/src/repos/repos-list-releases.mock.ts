import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_RELEASES } from './repos-list-releases.token';
import type { ReposListReleasesResponse } from './repos-list-releases.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-releases',
  path: '/repos/{owner}/{repo}/releases',
  method: 'get',
  tag: 'repos',
};

export function provideReposListReleasesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListReleasesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_RELEASES,
    'REPOS_LIST_RELEASES',
    initialBehavior,
    _meta,
  );
}
