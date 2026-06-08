import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_GET_COMMIT } from './git-get-commit.token';
import type { GitGetCommitResponse } from './git-get-commit.token';

export function provideGitGetCommitMock(
  initialBehavior?: ProviderInitialBehavior<GitGetCommitResponse>,
): FactoryProvider {
  return provideMockResource(GIT_GET_COMMIT, 'GIT_GET_COMMIT', initialBehavior);
}
