import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_REPO_RULESET_HISTORY } from './repos-get-repo-ruleset-history.token';
import type { ReposGetRepoRulesetHistoryResponse } from './repos-get-repo-ruleset-history.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-repo-ruleset-history',
  path: '/repos/{owner}/{repo}/rulesets/{ruleset_id}/history',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetRepoRulesetHistoryMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetRepoRulesetHistoryResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_REPO_RULESET_HISTORY,
    'REPOS_GET_REPO_RULESET_HISTORY',
    initialBehavior,
    _meta,
  );
}
