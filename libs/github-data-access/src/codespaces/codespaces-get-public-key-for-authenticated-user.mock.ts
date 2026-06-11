import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_PUBLIC_KEY_FOR_AUTHENTICATED_USER } from './codespaces-get-public-key-for-authenticated-user.token';
import type { CodespacesGetPublicKeyForAuthenticatedUserResponse } from './codespaces-get-public-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/get-public-key-for-authenticated-user',
  path: '/user/codespaces/secrets/public-key',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesGetPublicKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetPublicKeyForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_PUBLIC_KEY_FOR_AUTHENTICATED_USER,
    'CODESPACES_GET_PUBLIC_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
