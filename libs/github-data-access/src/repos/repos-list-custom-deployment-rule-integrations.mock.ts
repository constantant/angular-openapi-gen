import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS } from './repos-list-custom-deployment-rule-integrations.token';
import type { ReposListCustomDeploymentRuleIntegrationsResponse } from './repos-list-custom-deployment-rule-integrations.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-custom-deployment-rule-integrations',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps',
  method: 'get',
  tag: 'repos',
};

export function provideReposListCustomDeploymentRuleIntegrationsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListCustomDeploymentRuleIntegrationsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS,
    'REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS',
    initialBehavior,
    _meta,
  );
}
