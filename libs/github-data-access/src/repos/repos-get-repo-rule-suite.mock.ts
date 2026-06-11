import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_REPO_RULE_SUITE } from './repos-get-repo-rule-suite.token';
import type { ReposGetRepoRuleSuiteResponse } from './repos-get-repo-rule-suite.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-repo-rule-suite',
  path: '/repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetRepoRuleSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetRepoRuleSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_REPO_RULE_SUITE,
    'REPOS_GET_REPO_RULE_SUITE',
    initialBehavior,
    _meta,
  );
}
