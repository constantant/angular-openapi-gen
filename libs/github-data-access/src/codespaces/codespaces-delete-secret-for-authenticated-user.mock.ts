import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_DELETE_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-delete-secret-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/delete-secret-for-authenticated-user',
  path: '/user/codespaces/secrets/{secret_name}',
  method: 'delete',
  tag: 'codespaces',
};

export function provideCodespacesDeleteSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_DELETE_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_DELETE_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
