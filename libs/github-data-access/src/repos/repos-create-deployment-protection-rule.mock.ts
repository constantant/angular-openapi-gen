import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_DEPLOYMENT_PROTECTION_RULE } from './repos-create-deployment-protection-rule.token';
import type { ReposCreateDeploymentProtectionRuleResponse } from './repos-create-deployment-protection-rule.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-deployment-protection-rule',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateDeploymentProtectionRuleMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateDeploymentProtectionRuleResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_DEPLOYMENT_PROTECTION_RULE,
    'REPOS_CREATE_DEPLOYMENT_PROTECTION_RULE',
    initialBehavior,
    _meta,
  );
}
