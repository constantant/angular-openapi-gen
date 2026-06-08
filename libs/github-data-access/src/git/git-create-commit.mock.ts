import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_CREATE_COMMIT } from './git-create-commit.token';
import type { GitCreateCommitResponse } from './git-create-commit.token';

export function provideGitCreateCommitMock(
  initialBehavior?: ProviderInitialBehavior<GitCreateCommitResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_CREATE_COMMIT,
    'GIT_CREATE_COMMIT',
    initialBehavior,
  );
}
