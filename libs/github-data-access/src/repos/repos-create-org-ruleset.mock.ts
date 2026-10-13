import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreateOrgRuleset,
  type ReposCreateOrgRulesetResponse,
} from './repos-create-org-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-org-ruleset',
  path: '/orgs/{org}/rulesets',
  method: 'post',
  tag: 'repos',
};

export const REPOS_CREATE_ORG_RULESET_MOCK: MockEndpoint<ReposCreateOrgRulesetResponse> =
  {
    key: 'REPOS_CREATE_ORG_RULESET',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreateOrgRuleset,
  };

export function provideReposCreateOrgRulesetMock(
  initialBehavior?: MockEndpointBehavior<ReposCreateOrgRulesetResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_CREATE_ORG_RULESET_MOCK, initialBehavior);
}
