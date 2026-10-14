import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDeleteOrgRuleset } from './repos-delete-org-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-org-ruleset',
  path: '/orgs/{org}/rulesets/{ruleset_id}',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DELETE_ORG_RULESET_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DELETE_ORG_RULESET',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDeleteOrgRuleset,
};

export function provideReposDeleteOrgRulesetMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_DELETE_ORG_RULESET_MOCK, initialBehavior);
}
