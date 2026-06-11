import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_DEPLOYMENT } from './repos-delete-deployment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-deployment',
  path: '/repos/{owner}/{repo}/deployments/{deployment_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_DEPLOYMENT,
    'REPOS_DELETE_DEPLOYMENT',
    initialBehavior,
    _meta,
  );
}
