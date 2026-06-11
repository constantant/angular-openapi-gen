import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_DEPLOYMENT } from './repos-get-deployment.token';
import type { ReposGetDeploymentResponse } from './repos-get-deployment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-deployment',
  path: '/repos/{owner}/{repo}/deployments/{deployment_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetDeploymentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_DEPLOYMENT,
    'REPOS_GET_DEPLOYMENT',
    initialBehavior,
    _meta,
  );
}
