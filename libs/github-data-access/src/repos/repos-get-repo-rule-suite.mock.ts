import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_REPO_RULE_SUITE } from './repos-get-repo-rule-suite.token';
import type { ReposGetRepoRuleSuiteResponse } from './repos-get-repo-rule-suite.token';

export function provideReposGetRepoRuleSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetRepoRuleSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_REPO_RULE_SUITE,
    'REPOS_GET_REPO_RULE_SUITE',
    initialBehavior,
  );
}
