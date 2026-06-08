import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ORG_RULESET } from './repos-get-org-ruleset.token';
import type { ReposGetOrgRulesetResponse } from './repos-get-org-ruleset.token';

export function provideReposGetOrgRulesetMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetOrgRulesetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ORG_RULESET,
    'REPOS_GET_ORG_RULESET',
    initialBehavior,
  );
}
