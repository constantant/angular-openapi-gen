import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_DELETE_ORG_SECRET } from './codespaces-delete-org-secret.token';

export function provideCodespacesDeleteOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_DELETE_ORG_SECRET,
    'CODESPACES_DELETE_ORG_SECRET',
    initialBehavior,
  );
}
