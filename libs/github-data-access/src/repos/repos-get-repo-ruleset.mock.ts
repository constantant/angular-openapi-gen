import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_REPO_RULESET } from './repos-get-repo-ruleset.token';
import type { ReposGetRepoRulesetResponse } from './repos-get-repo-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-repo-ruleset',
  path: '/repos/{owner}/{repo}/rulesets/{ruleset_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetRepoRulesetMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetRepoRulesetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_REPO_RULESET,
    'REPOS_GET_REPO_RULESET',
    initialBehavior,
    _meta,
  );
}
