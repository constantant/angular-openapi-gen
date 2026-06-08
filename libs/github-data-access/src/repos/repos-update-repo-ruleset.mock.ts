import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_REPO_RULESET } from './repos-update-repo-ruleset.token';
import type { ReposUpdateRepoRulesetResponse } from './repos-update-repo-ruleset.token';

export function provideReposUpdateRepoRulesetMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateRepoRulesetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_REPO_RULESET,
    'REPOS_UPDATE_REPO_RULESET',
    initialBehavior,
  );
}
