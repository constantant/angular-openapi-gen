import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_DEPLOYMENT } from './repos-create-deployment.token';
import type { ReposCreateDeploymentResponse } from './repos-create-deployment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-deployment',
  path: '/repos/{owner}/{repo}/deployments',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateDeploymentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_DEPLOYMENT,
    'REPOS_CREATE_DEPLOYMENT',
    initialBehavior,
    _meta,
  );
}
