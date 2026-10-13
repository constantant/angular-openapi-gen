import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDeleteRepoRuleset } from './repos-delete-repo-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-repo-ruleset',
  path: '/repos/{owner}/{repo}/rulesets/{ruleset_id}',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DELETE_REPO_RULESET_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DELETE_REPO_RULESET',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDeleteRepoRuleset,
};

export function provideReposDeleteRepoRulesetMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_DELETE_REPO_RULESET_MOCK, initialBehavior);
}
