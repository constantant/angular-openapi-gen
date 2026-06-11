import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_GET_ORG_RULESET_HISTORY } from './orgs-get-org-ruleset-history.token';
import type { OrgsGetOrgRulesetHistoryResponse } from './orgs-get-org-ruleset-history.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/get-org-ruleset-history',
  path: '/orgs/{org}/rulesets/{ruleset_id}/history',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsGetOrgRulesetHistoryMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetOrgRulesetHistoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_ORG_RULESET_HISTORY,
    'ORGS_GET_ORG_RULESET_HISTORY',
    initialBehavior,
    _meta,
  );
}
