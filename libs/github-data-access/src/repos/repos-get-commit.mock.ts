import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_COMMIT } from './repos-get-commit.token';
import type { ReposGetCommitResponse } from './repos-get-commit.token';

export function provideReposGetCommitMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCommitResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_COMMIT,
    'REPOS_GET_COMMIT',
    initialBehavior,
  );
}
