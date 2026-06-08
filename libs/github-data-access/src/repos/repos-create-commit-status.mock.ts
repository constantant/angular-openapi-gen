import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_COMMIT_STATUS } from './repos-create-commit-status.token';
import type { ReposCreateCommitStatusResponse } from './repos-create-commit-status.token';

export function provideReposCreateCommitStatusMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateCommitStatusResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_COMMIT_STATUS,
    'REPOS_CREATE_COMMIT_STATUS',
    initialBehavior,
  );
}
