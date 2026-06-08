import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_ORG_RULESET } from './repos-delete-org-ruleset.token';

export function provideReposDeleteOrgRulesetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_ORG_RULESET,
    'REPOS_DELETE_ORG_RULESET',
    initialBehavior,
  );
}
