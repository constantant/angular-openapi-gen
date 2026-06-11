import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_ENABLE_AUTOMATED_SECURITY_FIXES } from './repos-enable-automated-security-fixes.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/enable-automated-security-fixes',
  path: '/repos/{owner}/{repo}/automated-security-fixes',
  method: 'put',
  tag: 'repos',
};

export function provideReposEnableAutomatedSecurityFixesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ENABLE_AUTOMATED_SECURITY_FIXES,
    'REPOS_ENABLE_AUTOMATED_SECURITY_FIXES',
    initialBehavior,
    _meta,
  );
}
