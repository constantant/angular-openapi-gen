import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreateDeploymentStatus,
  type ReposCreateDeploymentStatusResponse,
} from './repos-create-deployment-status.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-deployment-status',
  path: '/repos/{owner}/{repo}/deployments/{deployment_id}/statuses',
  method: 'post',
  tag: 'repos',
};

export const REPOS_CREATE_DEPLOYMENT_STATUS_MOCK: MockEndpoint<ReposCreateDeploymentStatusResponse> =
  {
    key: 'REPOS_CREATE_DEPLOYMENT_STATUS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreateDeploymentStatus,
  };

export function provideReposCreateDeploymentStatusMock(
  initialBehavior?: MockEndpointBehavior<ReposCreateDeploymentStatusResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_CREATE_DEPLOYMENT_STATUS_MOCK,
    initialBehavior,
  );
}
