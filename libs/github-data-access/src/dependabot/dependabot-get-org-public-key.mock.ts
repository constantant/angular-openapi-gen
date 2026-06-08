import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_GET_ORG_PUBLIC_KEY } from './dependabot-get-org-public-key.token';
import type { DependabotGetOrgPublicKeyResponse } from './dependabot-get-org-public-key.token';

export function provideDependabotGetOrgPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<DependabotGetOrgPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_GET_ORG_PUBLIC_KEY,
    'DEPENDABOT_GET_ORG_PUBLIC_KEY',
    initialBehavior,
  );
}
