import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_REPO_MACHINES_FOR_AUTHENTICATED_USER } from './codespaces-repo-machines-for-authenticated-user.token';
import type { CodespacesRepoMachinesForAuthenticatedUserResponse } from './codespaces-repo-machines-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/repo-machines-for-authenticated-user',
  path: '/repos/{owner}/{repo}/codespaces/machines',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesRepoMachinesForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesRepoMachinesForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_REPO_MACHINES_FOR_AUTHENTICATED_USER,
    'CODESPACES_REPO_MACHINES_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
