import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CHECK_AUTOMATED_SECURITY_FIXES } from './repos-check-automated-security-fixes.token';
import type { ReposCheckAutomatedSecurityFixesResponse } from './repos-check-automated-security-fixes.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/check-automated-security-fixes',
  path: '/repos/{owner}/{repo}/automated-security-fixes',
  method: 'get',
  tag: 'repos',
};

export function provideReposCheckAutomatedSecurityFixesMock(
  initialBehavior?: ProviderInitialBehavior<ReposCheckAutomatedSecurityFixesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CHECK_AUTOMATED_SECURITY_FIXES,
    'REPOS_CHECK_AUTOMATED_SECURITY_FIXES',
    initialBehavior,
    _meta,
  );
}
