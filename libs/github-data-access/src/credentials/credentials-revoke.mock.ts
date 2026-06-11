import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CREDENTIALS_REVOKE } from './credentials-revoke.token';
import type { CredentialsRevokeResponse } from './credentials-revoke.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'credentials/revoke',
  path: '/credentials/revoke',
  method: 'post',
  tag: 'credentials',
};

export function provideCredentialsRevokeMock(
  initialBehavior?: ProviderInitialBehavior<CredentialsRevokeResponse>,
): FactoryProvider {
  return provideMockResource(
    CREDENTIALS_REVOKE,
    'CREDENTIALS_REVOKE',
    initialBehavior,
    _meta,
  );
}
