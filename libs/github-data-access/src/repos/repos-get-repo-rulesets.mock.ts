import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_REPO_RULESETS } from './repos-get-repo-rulesets.token';
import type { ReposGetRepoRulesetsResponse } from './repos-get-repo-rulesets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-repo-rulesets',
  path: '/repos/{owner}/{repo}/rulesets',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetRepoRulesetsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetRepoRulesetsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_REPO_RULESETS,
    'REPOS_GET_REPO_RULESETS',
    initialBehavior,
    _meta,
  );
}
