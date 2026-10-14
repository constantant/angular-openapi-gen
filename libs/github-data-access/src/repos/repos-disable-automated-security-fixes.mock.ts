import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDisableAutomatedSecurityFixes } from './repos-disable-automated-security-fixes.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/disable-automated-security-fixes',
  path: '/repos/{owner}/{repo}/automated-security-fixes',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DISABLE_AUTOMATED_SECURITY_FIXES_MOCK: MockEndpoint<unknown> =
  {
    key: 'REPOS_DISABLE_AUTOMATED_SECURITY_FIXES',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposDisableAutomatedSecurityFixes,
  };

export function provideReposDisableAutomatedSecurityFixesMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_DISABLE_AUTOMATED_SECURITY_FIXES_MOCK,
    initialBehavior,
  );
}
