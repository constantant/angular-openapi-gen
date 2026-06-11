import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_DEPLOYMENT_STATUS } from './repos-create-deployment-status.token';
import type { ReposCreateDeploymentStatusResponse } from './repos-create-deployment-status.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-deployment-status',
  path: '/repos/{owner}/{repo}/deployments/{deployment_id}/statuses',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateDeploymentStatusMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateDeploymentStatusResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_DEPLOYMENT_STATUS,
    'REPOS_CREATE_DEPLOYMENT_STATUS',
    initialBehavior,
    _meta,
  );
}
