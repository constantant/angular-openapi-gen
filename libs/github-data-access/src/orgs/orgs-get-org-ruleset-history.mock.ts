import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_GET_ORG_RULESET_HISTORY } from './orgs-get-org-ruleset-history.token';
import type { OrgsGetOrgRulesetHistoryResponse } from './orgs-get-org-ruleset-history.token';

export function provideOrgsGetOrgRulesetHistoryMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetOrgRulesetHistoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_ORG_RULESET_HISTORY,
    'ORGS_GET_ORG_RULESET_HISTORY',
    initialBehavior,
  );
}
