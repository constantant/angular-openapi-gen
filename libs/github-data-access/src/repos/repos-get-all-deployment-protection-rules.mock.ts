import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetAllDeploymentProtectionRules,
  type ReposGetAllDeploymentProtectionRulesResponse,
} from './repos-get-all-deployment-protection-rules.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-all-deployment-protection-rules',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES_MOCK: MockEndpoint<ReposGetAllDeploymentProtectionRulesResponse> =
  {
    key: 'REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetAllDeploymentProtectionRules,
  };

export function provideReposGetAllDeploymentProtectionRulesMock(
  initialBehavior?: MockEndpointBehavior<ReposGetAllDeploymentProtectionRulesResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES_MOCK,
    initialBehavior,
  );
}
