import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE } from './repos-disable-deployment-protection-rule.token';

export function provideReposDisableDeploymentProtectionRuleMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE,
    'REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE',
    initialBehavior,
  );
}
