import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_STATUS_CHECKS_PROTECTION } from './repos-get-status-checks-protection.token';
import type { ReposGetStatusChecksProtectionResponse } from './repos-get-status-checks-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-status-checks-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetStatusChecksProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetStatusChecksProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_STATUS_CHECKS_PROTECTION,
    'REPOS_GET_STATUS_CHECKS_PROTECTION',
    initialBehavior,
    _meta,
  );
}
