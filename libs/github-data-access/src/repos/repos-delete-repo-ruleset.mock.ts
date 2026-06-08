import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_REPO_RULESET } from './repos-delete-repo-ruleset.token';

export function provideReposDeleteRepoRulesetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_REPO_RULESET,
    'REPOS_DELETE_REPO_RULESET',
    initialBehavior,
  );
}
