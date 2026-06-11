import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ORG_RULESET } from './repos-get-org-ruleset.token';
import type { ReposGetOrgRulesetResponse } from './repos-get-org-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-org-ruleset',
  path: '/orgs/{org}/rulesets/{ruleset_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetOrgRulesetMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetOrgRulesetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ORG_RULESET,
    'REPOS_GET_ORG_RULESET',
    initialBehavior,
    _meta,
  );
}
