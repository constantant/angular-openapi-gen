import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ORG_RULE_SUITE } from './repos-get-org-rule-suite.token';
import type { ReposGetOrgRuleSuiteResponse } from './repos-get-org-rule-suite.token';

export function provideReposGetOrgRuleSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetOrgRuleSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ORG_RULE_SUITE,
    'REPOS_GET_ORG_RULE_SUITE',
    initialBehavior,
  );
}
