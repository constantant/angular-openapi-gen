import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_ORG_RULESET } from './repos-update-org-ruleset.token';
import type { ReposUpdateOrgRulesetResponse } from './repos-update-org-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-org-ruleset',
  path: '/orgs/{org}/rulesets/{ruleset_id}',
  method: 'put',
  tag: 'repos',
};

export function provideReposUpdateOrgRulesetMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateOrgRulesetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_ORG_RULESET,
    'REPOS_UPDATE_ORG_RULESET',
    initialBehavior,
    _meta,
  );
}
