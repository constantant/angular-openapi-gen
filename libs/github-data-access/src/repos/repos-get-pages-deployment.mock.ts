import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_PAGES_DEPLOYMENT } from './repos-get-pages-deployment.token';
import type { ReposGetPagesDeploymentResponse } from './repos-get-pages-deployment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-pages-deployment',
  path: '/repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetPagesDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetPagesDeploymentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_PAGES_DEPLOYMENT,
    'REPOS_GET_PAGES_DEPLOYMENT',
    initialBehavior,
    _meta,
  );
}
