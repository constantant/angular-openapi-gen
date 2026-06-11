import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_SET_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-set-repositories-for-secret-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/set-repositories-for-secret-for-authenticated-user',
  path: '/user/codespaces/secrets/{secret_name}/repositories',
  method: 'put',
  tag: 'codespaces',
};

export function provideCodespacesSetRepositoriesForSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_SET_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_SET_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
