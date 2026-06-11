import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_REPO_RULESET_VERSION } from './repos-get-repo-ruleset-version.token';
import type { ReposGetRepoRulesetVersionResponse } from './repos-get-repo-ruleset-version.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-repo-ruleset-version',
  path: '/repos/{owner}/{repo}/rulesets/{ruleset_id}/history/{version_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetRepoRulesetVersionMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetRepoRulesetVersionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_REPO_RULESET_VERSION,
    'REPOS_GET_REPO_RULESET_VERSION',
    initialBehavior,
    _meta,
  );
}
