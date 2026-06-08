import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_GET_ORG_PUBLIC_KEY } from './agents-get-org-public-key.token';
import type { AgentsGetOrgPublicKeyResponse } from './agents-get-org-public-key.token';

export function provideAgentsGetOrgPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<AgentsGetOrgPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_GET_ORG_PUBLIC_KEY,
    'AGENTS_GET_ORG_PUBLIC_KEY',
    initialBehavior,
  );
}
