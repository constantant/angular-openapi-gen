import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_REPO_RULE_SUITES } from './repos-get-repo-rule-suites.token';
import type { ReposGetRepoRuleSuitesResponse } from './repos-get-repo-rule-suites.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-repo-rule-suites',
  path: '/repos/{owner}/{repo}/rulesets/rule-suites',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetRepoRuleSuitesMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetRepoRuleSuitesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_REPO_RULE_SUITES,
    'REPOS_GET_REPO_RULE_SUITES',
    initialBehavior,
    _meta,
  );
}
