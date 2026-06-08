import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CREDENTIALS_REVOKE } from './credentials-revoke.token';
import type { CredentialsRevokeResponse } from './credentials-revoke.token';

export function provideCredentialsRevokeMock(
  initialBehavior?: ProviderInitialBehavior<CredentialsRevokeResponse>,
): FactoryProvider {
  return provideMockResource(
    CREDENTIALS_REVOKE,
    'CREDENTIALS_REVOKE',
    initialBehavior,
  );
}
