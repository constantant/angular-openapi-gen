import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_CREATE_WITH_REPO_FOR_AUTHENTICATED_USER } from './codespaces-create-with-repo-for-authenticated-user.token';
import type { CodespacesCreateWithRepoForAuthenticatedUserResponse } from './codespaces-create-with-repo-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/create-with-repo-for-authenticated-user',
  path: '/repos/{owner}/{repo}/codespaces',
  method: 'post',
  tag: 'codespaces',
};

export function provideCodespacesCreateWithRepoForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCreateWithRepoForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CREATE_WITH_REPO_FOR_AUTHENTICATED_USER,
    'CODESPACES_CREATE_WITH_REPO_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
