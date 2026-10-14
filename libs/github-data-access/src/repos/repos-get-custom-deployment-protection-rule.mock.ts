import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetCustomDeploymentProtectionRule,
  type ReposGetCustomDeploymentProtectionRuleResponse,
} from './repos-get-custom-deployment-protection-rule.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-custom-deployment-protection-rule',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE_MOCK: MockEndpoint<ReposGetCustomDeploymentProtectionRuleResponse> =
  {
    key: 'REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetCustomDeploymentProtectionRule,
  };

export function provideReposGetCustomDeploymentProtectionRuleMock(
  initialBehavior?: MockEndpointBehavior<ReposGetCustomDeploymentProtectionRuleResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE_MOCK,
    initialBehavior,
  );
}
