import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetRepoRuleSuite,
  type ReposGetRepoRuleSuiteResponse,
} from './repos-get-repo-rule-suite.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-repo-rule-suite',
  path: '/repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_REPO_RULE_SUITE_MOCK: MockEndpoint<ReposGetRepoRuleSuiteResponse> =
  {
    key: 'REPOS_GET_REPO_RULE_SUITE',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetRepoRuleSuite,
  };

export function provideReposGetRepoRuleSuiteMock(
  initialBehavior?: MockEndpointBehavior<ReposGetRepoRuleSuiteResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_REPO_RULE_SUITE_MOCK, initialBehavior);
}
