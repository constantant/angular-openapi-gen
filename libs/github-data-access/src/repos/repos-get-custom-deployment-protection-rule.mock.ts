import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE } from './repos-get-custom-deployment-protection-rule.token';
import type { ReposGetCustomDeploymentProtectionRuleResponse } from './repos-get-custom-deployment-protection-rule.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-custom-deployment-protection-rule',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetCustomDeploymentProtectionRuleMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCustomDeploymentProtectionRuleResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE,
    'REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE',
    initialBehavior,
    _meta,
  );
}
