import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_REPO_RULESET } from './repos-delete-repo-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-repo-ruleset',
  path: '/repos/{owner}/{repo}/rulesets/{ruleset_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteRepoRulesetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_REPO_RULESET,
    'REPOS_DELETE_REPO_RULESET',
    initialBehavior,
    _meta,
  );
}
