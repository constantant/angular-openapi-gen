import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_GET_ORG_RULESET_VERSION } from './orgs-get-org-ruleset-version.token';
import type { OrgsGetOrgRulesetVersionResponse } from './orgs-get-org-ruleset-version.token';

export function provideOrgsGetOrgRulesetVersionMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetOrgRulesetVersionResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_ORG_RULESET_VERSION,
    'ORGS_GET_ORG_RULESET_VERSION',
    initialBehavior,
  );
}
