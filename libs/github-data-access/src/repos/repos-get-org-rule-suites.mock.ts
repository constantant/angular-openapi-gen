import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ORG_RULE_SUITES } from './repos-get-org-rule-suites.token';
import type { ReposGetOrgRuleSuitesResponse } from './repos-get-org-rule-suites.token';

export function provideReposGetOrgRuleSuitesMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetOrgRuleSuitesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ORG_RULE_SUITES,
    'REPOS_GET_ORG_RULE_SUITES',
    initialBehavior,
  );
}
