import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposRemoveStatusCheckContexts,
  type ReposRemoveStatusCheckContextsResponse,
} from './repos-remove-status-check-contexts.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/remove-status-check-contexts',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_REMOVE_STATUS_CHECK_CONTEXTS_MOCK: MockEndpoint<ReposRemoveStatusCheckContextsResponse> =
  {
    key: 'REPOS_REMOVE_STATUS_CHECK_CONTEXTS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposRemoveStatusCheckContexts,
  };

export function provideReposRemoveStatusCheckContextsMock(
  initialBehavior?: MockEndpointBehavior<ReposRemoveStatusCheckContextsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_REMOVE_STATUS_CHECK_CONTEXTS_MOCK,
    initialBehavior,
  );
}
