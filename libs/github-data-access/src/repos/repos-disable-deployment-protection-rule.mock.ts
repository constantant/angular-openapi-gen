import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE } from './repos-disable-deployment-protection-rule.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/disable-deployment-protection-rule',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDisableDeploymentProtectionRuleMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE,
    'REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE',
    initialBehavior,
    _meta,
  );
}
