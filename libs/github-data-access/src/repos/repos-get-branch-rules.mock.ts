import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_BRANCH_RULES } from './repos-get-branch-rules.token';
import type { ReposGetBranchRulesResponse } from './repos-get-branch-rules.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-branch-rules',
  path: '/repos/{owner}/{repo}/rules/branches/{branch}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetBranchRulesMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetBranchRulesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_BRANCH_RULES,
    'REPOS_GET_BRANCH_RULES',
    initialBehavior,
    _meta,
  );
}
