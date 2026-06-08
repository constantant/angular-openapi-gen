import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_LIST_ORG_PATTERN_CONFIGS } from './secret-scanning-list-org-pattern-configs.token';
import type { SecretScanningListOrgPatternConfigsResponse } from './secret-scanning-list-org-pattern-configs.token';

export function provideSecretScanningListOrgPatternConfigsMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningListOrgPatternConfigsResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_LIST_ORG_PATTERN_CONFIGS,
    'SECRET_SCANNING_LIST_ORG_PATTERN_CONFIGS',
    initialBehavior,
  );
}
