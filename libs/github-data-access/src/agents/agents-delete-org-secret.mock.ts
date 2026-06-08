import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_DELETE_ORG_SECRET } from './agents-delete-org-secret.token';

export function provideAgentsDeleteOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_DELETE_ORG_SECRET,
    'AGENTS_DELETE_ORG_SECRET',
    initialBehavior,
  );
}
