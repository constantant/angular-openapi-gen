import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_PAGES_DEPLOYMENT } from './repos-create-pages-deployment.token';
import type { ReposCreatePagesDeploymentResponse } from './repos-create-pages-deployment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-pages-deployment',
  path: '/repos/{owner}/{repo}/pages/deployments',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreatePagesDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreatePagesDeploymentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_PAGES_DEPLOYMENT,
    'REPOS_CREATE_PAGES_DEPLOYMENT',
    initialBehavior,
    _meta,
  );
}
