import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_REMOVE_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-remove-repository-for-secret-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/remove-repository-for-secret-for-authenticated-user',
  path: '/user/codespaces/secrets/{secret_name}/repositories/{repository_id}',
  method: 'delete',
  tag: 'codespaces',
};

export function provideCodespacesRemoveRepositoryForSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_REMOVE_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_REMOVE_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
