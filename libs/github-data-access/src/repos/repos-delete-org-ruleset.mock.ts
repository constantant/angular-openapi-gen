import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_ORG_RULESET } from './repos-delete-org-ruleset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-org-ruleset',
  path: '/orgs/{org}/rulesets/{ruleset_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteOrgRulesetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_ORG_RULESET,
    'REPOS_DELETE_ORG_RULESET',
    initialBehavior,
    _meta,
  );
}
