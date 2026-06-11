import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ORG_RULESETS } from './repos-get-org-rulesets.token';
import type { ReposGetOrgRulesetsResponse } from './repos-get-org-rulesets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-org-rulesets',
  path: '/orgs/{org}/rulesets',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetOrgRulesetsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetOrgRulesetsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ORG_RULESETS,
    'REPOS_GET_ORG_RULESETS',
    initialBehavior,
    _meta,
  );
}
