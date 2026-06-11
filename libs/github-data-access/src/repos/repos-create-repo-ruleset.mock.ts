import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_REPO_RULESET } from './repos-create-repo-ruleset.token';
import type { ReposCreateRepoRulesetResponse } from './repos-create-repo-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-repo-ruleset',
  path: '/repos/{owner}/{repo}/rulesets',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateRepoRulesetMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateRepoRulesetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_REPO_RULESET,
    'REPOS_CREATE_REPO_RULESET',
    initialBehavior,
    _meta,
  );
}
