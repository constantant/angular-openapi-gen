import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposUpdateOrgRuleset,
  type ReposUpdateOrgRulesetResponse,
} from './repos-update-org-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-org-ruleset',
  path: '/orgs/{org}/rulesets/{ruleset_id}',
  method: 'put',
  tag: 'repos',
};

export const REPOS_UPDATE_ORG_RULESET_MOCK: MockEndpoint<ReposUpdateOrgRulesetResponse> =
  {
    key: 'REPOS_UPDATE_ORG_RULESET',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdateOrgRuleset,
  };

export function provideReposUpdateOrgRulesetMock(
  initialBehavior?: MockEndpointBehavior<ReposUpdateOrgRulesetResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_UPDATE_ORG_RULESET_MOCK, initialBehavior);
}
