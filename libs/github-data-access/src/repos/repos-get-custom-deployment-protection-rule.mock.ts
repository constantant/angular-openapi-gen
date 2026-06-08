import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE } from './repos-get-custom-deployment-protection-rule.token';
import type { ReposGetCustomDeploymentProtectionRuleResponse } from './repos-get-custom-deployment-protection-rule.token';

export function provideReposGetCustomDeploymentProtectionRuleMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCustomDeploymentProtectionRuleResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE,
    'REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE',
    initialBehavior,
  );
}
