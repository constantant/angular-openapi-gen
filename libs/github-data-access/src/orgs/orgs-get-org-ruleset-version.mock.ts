import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_GET_ORG_RULESET_VERSION } from './orgs-get-org-ruleset-version.token';
import type { OrgsGetOrgRulesetVersionResponse } from './orgs-get-org-ruleset-version.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/get-org-ruleset-version',
  path: '/orgs/{org}/rulesets/{ruleset_id}/history/{version_id}',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsGetOrgRulesetVersionMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetOrgRulesetVersionResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_ORG_RULESET_VERSION,
    'ORGS_GET_ORG_RULESET_VERSION',
    initialBehavior,
    _meta,
  );
}
