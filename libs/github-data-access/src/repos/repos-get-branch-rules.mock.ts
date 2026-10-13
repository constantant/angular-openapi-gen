import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetBranchRules,
  type ReposGetBranchRulesResponse,
} from './repos-get-branch-rules.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-branch-rules',
  path: '/repos/{owner}/{repo}/rules/branches/{branch}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_BRANCH_RULES_MOCK: MockEndpoint<ReposGetBranchRulesResponse> =
  {
    key: 'REPOS_GET_BRANCH_RULES',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetBranchRules,
  };

export function provideReposGetBranchRulesMock(
  initialBehavior?: MockEndpointBehavior<ReposGetBranchRulesResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_BRANCH_RULES_MOCK, initialBehavior);
}
