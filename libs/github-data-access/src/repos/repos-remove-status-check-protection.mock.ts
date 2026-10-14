import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposRemoveStatusCheckProtection } from './repos-remove-status-check-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/remove-status-check-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_REMOVE_STATUS_CHECK_PROTECTION_MOCK: MockEndpoint<unknown> =
  {
    key: 'REPOS_REMOVE_STATUS_CHECK_PROTECTION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposRemoveStatusCheckProtection,
  };

export function provideReposRemoveStatusCheckProtectionMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_REMOVE_STATUS_CHECK_PROTECTION_MOCK,
    initialBehavior,
  );
}
