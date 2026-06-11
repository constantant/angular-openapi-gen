import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DISABLE_AUTOMATED_SECURITY_FIXES } from './repos-disable-automated-security-fixes.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/disable-automated-security-fixes',
  path: '/repos/{owner}/{repo}/automated-security-fixes',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDisableAutomatedSecurityFixesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DISABLE_AUTOMATED_SECURITY_FIXES,
    'REPOS_DISABLE_AUTOMATED_SECURITY_FIXES',
    initialBehavior,
    _meta,
  );
}
