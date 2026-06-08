import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_ORG_RULESET } from './repos-update-org-ruleset.token';
import type { ReposUpdateOrgRulesetResponse } from './repos-update-org-ruleset.token';

export function provideReposUpdateOrgRulesetMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateOrgRulesetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_ORG_RULESET,
    'REPOS_UPDATE_ORG_RULESET',
    initialBehavior,
  );
}
