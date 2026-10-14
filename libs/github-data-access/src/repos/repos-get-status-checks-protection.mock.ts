import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetStatusChecksProtection,
  type ReposGetStatusChecksProtectionResponse,
} from './repos-get-status-checks-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-status-checks-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_STATUS_CHECKS_PROTECTION_MOCK: MockEndpoint<ReposGetStatusChecksProtectionResponse> =
  {
    key: 'REPOS_GET_STATUS_CHECKS_PROTECTION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetStatusChecksProtection,
  };

export function provideReposGetStatusChecksProtectionMock(
  initialBehavior?: MockEndpointBehavior<ReposGetStatusChecksProtectionResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_STATUS_CHECKS_PROTECTION_MOCK,
    initialBehavior,
  );
}
