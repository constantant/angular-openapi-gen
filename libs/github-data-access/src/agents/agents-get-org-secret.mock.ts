import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_GET_ORG_SECRET } from './agents-get-org-secret.token';
import type { AgentsGetOrgSecretResponse } from './agents-get-org-secret.token';

export function provideAgentsGetOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<AgentsGetOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_GET_ORG_SECRET,
    'AGENTS_GET_ORG_SECRET',
    initialBehavior,
  );
}
