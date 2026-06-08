import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_REPO_RULESET } from './repos-create-repo-ruleset.token';
import type { ReposCreateRepoRulesetResponse } from './repos-create-repo-ruleset.token';

export function provideReposCreateRepoRulesetMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateRepoRulesetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_REPO_RULESET,
    'REPOS_CREATE_REPO_RULESET',
    initialBehavior,
  );
}
