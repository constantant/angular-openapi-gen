import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ORG_RULE_SUITE } from './repos-get-org-rule-suite.token';
import type { ReposGetOrgRuleSuiteResponse } from './repos-get-org-rule-suite.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-org-rule-suite',
  path: '/orgs/{org}/rulesets/rule-suites/{rule_suite_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetOrgRuleSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetOrgRuleSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ORG_RULE_SUITE,
    'REPOS_GET_ORG_RULE_SUITE',
    initialBehavior,
    _meta,
  );
}
