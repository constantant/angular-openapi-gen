import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS } from './repos-list-custom-deployment-rule-integrations.token';
import type { ReposListCustomDeploymentRuleIntegrationsResponse } from './repos-list-custom-deployment-rule-integrations.token';

export function provideReposListCustomDeploymentRuleIntegrationsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListCustomDeploymentRuleIntegrationsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS,
    'REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS',
    initialBehavior,
  );
}
