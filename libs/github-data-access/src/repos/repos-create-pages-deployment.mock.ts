import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreatePagesDeployment,
  type ReposCreatePagesDeploymentResponse,
} from './repos-create-pages-deployment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-pages-deployment',
  path: '/repos/{owner}/{repo}/pages/deployments',
  method: 'post',
  tag: 'repos',
};

export const REPOS_CREATE_PAGES_DEPLOYMENT_MOCK: MockEndpoint<ReposCreatePagesDeploymentResponse> =
  {
    key: 'REPOS_CREATE_PAGES_DEPLOYMENT',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreatePagesDeployment,
  };

export function provideReposCreatePagesDeploymentMock(
  initialBehavior?: MockEndpointBehavior<ReposCreatePagesDeploymentResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_CREATE_PAGES_DEPLOYMENT_MOCK,
    initialBehavior,
  );
}
