import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_DEPLOYMENT_STATUS } from './repos-get-deployment-status.token';
import type { ReposGetDeploymentStatusResponse } from './repos-get-deployment-status.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-deployment-status',
  path: '/repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetDeploymentStatusMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetDeploymentStatusResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_DEPLOYMENT_STATUS,
    'REPOS_GET_DEPLOYMENT_STATUS',
    initialBehavior,
    _meta,
  );
}
