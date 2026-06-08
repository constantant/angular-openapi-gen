import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_STATUS_CHECKS_PROTECTION } from './repos-get-status-checks-protection.token';
import type { ReposGetStatusChecksProtectionResponse } from './repos-get-status-checks-protection.token';

export function provideReposGetStatusChecksProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetStatusChecksProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_STATUS_CHECKS_PROTECTION,
    'REPOS_GET_STATUS_CHECKS_PROTECTION',
    initialBehavior,
  );
}
