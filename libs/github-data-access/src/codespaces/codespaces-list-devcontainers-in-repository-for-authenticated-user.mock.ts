import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_DEVCONTAINERS_IN_REPOSITORY_FOR_AUTHENTICATED_USER } from './codespaces-list-devcontainers-in-repository-for-authenticated-user.token';
import type { CodespacesListDevcontainersInRepositoryForAuthenticatedUserResponse } from './codespaces-list-devcontainers-in-repository-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'codespaces/list-devcontainers-in-repository-for-authenticated-user',
  path: '/repos/{owner}/{repo}/codespaces/devcontainers',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesListDevcontainersInRepositoryForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListDevcontainersInRepositoryForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_DEVCONTAINERS_IN_REPOSITORY_FOR_AUTHENTICATED_USER,
    'CODESPACES_LIST_DEVCONTAINERS_IN_REPOSITORY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
