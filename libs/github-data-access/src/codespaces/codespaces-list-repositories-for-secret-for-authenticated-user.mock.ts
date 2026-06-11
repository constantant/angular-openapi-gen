import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-list-repositories-for-secret-for-authenticated-user.token';
import type { CodespacesListRepositoriesForSecretForAuthenticatedUserResponse } from './codespaces-list-repositories-for-secret-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/list-repositories-for-secret-for-authenticated-user',
  path: '/user/codespaces/secrets/{secret_name}/repositories',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesListRepositoriesForSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListRepositoriesForSecretForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_LIST_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
