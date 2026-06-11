import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_IN_REPOSITORY_FOR_AUTHENTICATED_USER } from './codespaces-list-in-repository-for-authenticated-user.token';
import type { CodespacesListInRepositoryForAuthenticatedUserResponse } from './codespaces-list-in-repository-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/list-in-repository-for-authenticated-user',
  path: '/repos/{owner}/{repo}/codespaces',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesListInRepositoryForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListInRepositoryForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_IN_REPOSITORY_FOR_AUTHENTICATED_USER,
    'CODESPACES_LIST_IN_REPOSITORY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
