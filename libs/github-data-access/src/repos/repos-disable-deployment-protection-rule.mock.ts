import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDisableDeploymentProtectionRule } from './repos-disable-deployment-protection-rule.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/disable-deployment-protection-rule',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE_MOCK: MockEndpoint<unknown> =
  {
    key: 'REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposDisableDeploymentProtectionRule,
  };

export function provideReposDisableDeploymentProtectionRuleMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE_MOCK,
    initialBehavior,
  );
}
