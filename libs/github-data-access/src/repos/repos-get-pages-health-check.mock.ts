import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_PAGES_HEALTH_CHECK } from './repos-get-pages-health-check.token';
import type { ReposGetPagesHealthCheckResponse } from './repos-get-pages-health-check.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-pages-health-check',
  path: '/repos/{owner}/{repo}/pages/health',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetPagesHealthCheckMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetPagesHealthCheckResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_PAGES_HEALTH_CHECK,
    'REPOS_GET_PAGES_HEALTH_CHECK',
    initialBehavior,
    _meta,
  );
}
