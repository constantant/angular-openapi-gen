import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreateRepoRuleset,
  type ReposCreateRepoRulesetResponse,
} from './repos-create-repo-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-repo-ruleset',
  path: '/repos/{owner}/{repo}/rulesets',
  method: 'post',
  tag: 'repos',
};

export const REPOS_CREATE_REPO_RULESET_MOCK: MockEndpoint<ReposCreateRepoRulesetResponse> =
  {
    key: 'REPOS_CREATE_REPO_RULESET',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreateRepoRuleset,
  };

export function provideReposCreateRepoRulesetMock(
  initialBehavior?: MockEndpointBehavior<ReposCreateRepoRulesetResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_CREATE_REPO_RULESET_MOCK, initialBehavior);
}
