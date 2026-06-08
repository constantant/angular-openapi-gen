import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_CREATE_WITH_REPO_FOR_AUTHENTICATED_USER } from './codespaces-create-with-repo-for-authenticated-user.token';
import type { CodespacesCreateWithRepoForAuthenticatedUserResponse } from './codespaces-create-with-repo-for-authenticated-user.token';

export function provideCodespacesCreateWithRepoForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCreateWithRepoForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CREATE_WITH_REPO_FOR_AUTHENTICATED_USER,
    'CODESPACES_CREATE_WITH_REPO_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
