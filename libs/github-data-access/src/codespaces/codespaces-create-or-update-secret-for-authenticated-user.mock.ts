import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_CREATE_OR_UPDATE_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-create-or-update-secret-for-authenticated-user.token';
import type { CodespacesCreateOrUpdateSecretForAuthenticatedUserResponse } from './codespaces-create-or-update-secret-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/create-or-update-secret-for-authenticated-user',
  path: '/user/codespaces/secrets/{secret_name}',
  method: 'put',
  tag: 'codespaces',
};

export function provideCodespacesCreateOrUpdateSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCreateOrUpdateSecretForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CREATE_OR_UPDATE_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_CREATE_OR_UPDATE_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
