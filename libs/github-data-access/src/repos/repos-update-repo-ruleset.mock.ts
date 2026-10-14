import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposUpdateRepoRuleset,
  type ReposUpdateRepoRulesetResponse,
} from './repos-update-repo-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-repo-ruleset',
  path: '/repos/{owner}/{repo}/rulesets/{ruleset_id}',
  method: 'put',
  tag: 'repos',
};

export const REPOS_UPDATE_REPO_RULESET_MOCK: MockEndpoint<ReposUpdateRepoRulesetResponse> =
  {
    key: 'REPOS_UPDATE_REPO_RULESET',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdateRepoRuleset,
  };

export function provideReposUpdateRepoRulesetMock(
  initialBehavior?: MockEndpointBehavior<ReposUpdateRepoRulesetResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_UPDATE_REPO_RULESET_MOCK, initialBehavior);
}
