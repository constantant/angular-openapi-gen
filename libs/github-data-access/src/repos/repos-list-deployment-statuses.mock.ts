import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_DEPLOYMENT_STATUSES } from './repos-list-deployment-statuses.token';
import type { ReposListDeploymentStatusesResponse } from './repos-list-deployment-statuses.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-deployment-statuses',
  path: '/repos/{owner}/{repo}/deployments/{deployment_id}/statuses',
  method: 'get',
  tag: 'repos',
};

export function provideReposListDeploymentStatusesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListDeploymentStatusesResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_DEPLOYMENT_STATUSES,
    'REPOS_LIST_DEPLOYMENT_STATUSES',
    initialBehavior,
    _meta,
    options,
  );
}
