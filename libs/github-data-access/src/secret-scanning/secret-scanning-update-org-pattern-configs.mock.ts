import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_UPDATE_ORG_PATTERN_CONFIGS } from './secret-scanning-update-org-pattern-configs.token';
import type { SecretScanningUpdateOrgPatternConfigsResponse } from './secret-scanning-update-org-pattern-configs.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'secret-scanning/update-org-pattern-configs',
  path: '/orgs/{org}/secret-scanning/pattern-configurations',
  method: 'patch',
  tag: 'secret-scanning',
};

export function provideSecretScanningUpdateOrgPatternConfigsMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningUpdateOrgPatternConfigsResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_UPDATE_ORG_PATTERN_CONFIGS,
    'SECRET_SCANNING_UPDATE_ORG_PATTERN_CONFIGS',
    initialBehavior,
    _meta,
  );
}
