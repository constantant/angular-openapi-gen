import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreateInOrg,
  type ReposCreateInOrgResponse,
} from './repos-create-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-in-org',
  path: '/orgs/{org}/repos',
  method: 'post',
  tag: 'repos',
};

export const REPOS_CREATE_IN_ORG_MOCK: MockEndpoint<ReposCreateInOrgResponse> =
  {
    key: 'REPOS_CREATE_IN_ORG',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreateInOrg,
  };

export function provideReposCreateInOrgMock(
  initialBehavior?: MockEndpointBehavior<ReposCreateInOrgResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_CREATE_IN_ORG_MOCK, initialBehavior);
}
