import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_ADD_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-add-repository-for-secret-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/add-repository-for-secret-for-authenticated-user',
  path: '/user/codespaces/secrets/{secret_name}/repositories/{repository_id}',
  method: 'put',
  tag: 'codespaces',
};

export function provideCodespacesAddRepositoryForSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_ADD_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_ADD_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
