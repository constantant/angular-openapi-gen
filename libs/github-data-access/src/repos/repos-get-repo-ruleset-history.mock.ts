import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_REPO_RULESET_HISTORY } from './repos-get-repo-ruleset-history.token';
import type { ReposGetRepoRulesetHistoryResponse } from './repos-get-repo-ruleset-history.token';

export function provideReposGetRepoRulesetHistoryMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetRepoRulesetHistoryResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_REPO_RULESET_HISTORY,
    'REPOS_GET_REPO_RULESET_HISTORY',
    initialBehavior,
  );
}
