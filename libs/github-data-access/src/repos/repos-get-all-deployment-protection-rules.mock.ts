import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES } from './repos-get-all-deployment-protection-rules.token';
import type { ReposGetAllDeploymentProtectionRulesResponse } from './repos-get-all-deployment-protection-rules.token';

export function provideReposGetAllDeploymentProtectionRulesMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAllDeploymentProtectionRulesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES,
    'REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES',
    initialBehavior,
  );
}
