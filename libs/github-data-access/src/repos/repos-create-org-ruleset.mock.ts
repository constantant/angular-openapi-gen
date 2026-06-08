import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_ORG_RULESET } from './repos-create-org-ruleset.token';
import type { ReposCreateOrgRulesetResponse } from './repos-create-org-ruleset.token';

export function provideReposCreateOrgRulesetMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateOrgRulesetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_ORG_RULESET,
    'REPOS_CREATE_ORG_RULESET',
    initialBehavior,
  );
}
