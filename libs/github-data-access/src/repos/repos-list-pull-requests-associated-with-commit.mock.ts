import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT } from './repos-list-pull-requests-associated-with-commit.token';
import type { ReposListPullRequestsAssociatedWithCommitResponse } from './repos-list-pull-requests-associated-with-commit.token';

export function provideReposListPullRequestsAssociatedWithCommitMock(
  initialBehavior?: ProviderInitialBehavior<ReposListPullRequestsAssociatedWithCommitResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT,
    'REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT',
    initialBehavior,
  );
}
