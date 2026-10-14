import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposUpdateStatusCheckProtection,
  type ReposUpdateStatusCheckProtectionResponse,
} from './repos-update-status-check-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-status-check-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks',
  method: 'patch',
  tag: 'repos',
};

export const REPOS_UPDATE_STATUS_CHECK_PROTECTION_MOCK: MockEndpoint<ReposUpdateStatusCheckProtectionResponse> =
  {
    key: 'REPOS_UPDATE_STATUS_CHECK_PROTECTION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdateStatusCheckProtection,
  };

export function provideReposUpdateStatusCheckProtectionMock(
  initialBehavior?: MockEndpointBehavior<ReposUpdateStatusCheckProtectionResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_UPDATE_STATUS_CHECK_PROTECTION_MOCK,
    initialBehavior,
  );
}
