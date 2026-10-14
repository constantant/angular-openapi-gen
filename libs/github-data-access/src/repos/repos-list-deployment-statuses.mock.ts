import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListDeploymentStatuses,
  type ReposListDeploymentStatusesResponse,
} from './repos-list-deployment-statuses.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-deployment-statuses',
  path: '/repos/{owner}/{repo}/deployments/{deployment_id}/statuses',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_DEPLOYMENT_STATUSES_MOCK: MockEndpoint<ReposListDeploymentStatusesResponse> =
  {
    key: 'REPOS_LIST_DEPLOYMENT_STATUSES',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposListDeploymentStatuses,
  };

export function provideReposListDeploymentStatusesMock(
  initialBehavior?: MockEndpointBehavior<ReposListDeploymentStatusesResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_LIST_DEPLOYMENT_STATUSES_MOCK,
    initialBehavior,
  );
}
