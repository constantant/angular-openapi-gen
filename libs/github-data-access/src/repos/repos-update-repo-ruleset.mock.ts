import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_REPO_RULESET } from './repos-update-repo-ruleset.token';
import type { ReposUpdateRepoRulesetResponse } from './repos-update-repo-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-repo-ruleset',
  path: '/repos/{owner}/{repo}/rulesets/{ruleset_id}',
  method: 'put',
  tag: 'repos',
};

export function provideReposUpdateRepoRulesetMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateRepoRulesetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_REPO_RULESET,
    'REPOS_UPDATE_REPO_RULESET',
    initialBehavior,
    _meta,
  );
}
