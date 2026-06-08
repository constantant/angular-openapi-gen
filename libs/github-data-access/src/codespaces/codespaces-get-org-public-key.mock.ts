import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_ORG_PUBLIC_KEY } from './codespaces-get-org-public-key.token';
import type { CodespacesGetOrgPublicKeyResponse } from './codespaces-get-org-public-key.token';

export function provideCodespacesGetOrgPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetOrgPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_ORG_PUBLIC_KEY,
    'CODESPACES_GET_ORG_PUBLIC_KEY',
    initialBehavior,
  );
}
