import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_REPO_RULE_SUITES } from './repos-get-repo-rule-suites.token';
import type { ReposGetRepoRuleSuitesResponse } from './repos-get-repo-rule-suites.token';

export function provideReposGetRepoRuleSuitesMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetRepoRuleSuitesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_REPO_RULE_SUITES,
    'REPOS_GET_REPO_RULE_SUITES',
    initialBehavior,
  );
}
