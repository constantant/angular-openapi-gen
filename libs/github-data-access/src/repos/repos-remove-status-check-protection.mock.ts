import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_REMOVE_STATUS_CHECK_PROTECTION } from './repos-remove-status-check-protection.token';

export function provideReposRemoveStatusCheckProtectionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REMOVE_STATUS_CHECK_PROTECTION,
    'REPOS_REMOVE_STATUS_CHECK_PROTECTION',
    initialBehavior,
  );
}
