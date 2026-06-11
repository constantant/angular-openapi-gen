import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_SELECTED_REPOS_FOR_ORG_SECRET } from './agents-list-selected-repos-for-org-secret.token';
import type { AgentsListSelectedReposForOrgSecretResponse } from './agents-list-selected-repos-for-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/list-selected-repos-for-org-secret',
  path: '/orgs/{org}/agents/secrets/{secret_name}/repositories',
  method: 'get',
  tag: 'agents',
};

export function provideAgentsListSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListSelectedReposForOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_SELECTED_REPOS_FOR_ORG_SECRET,
    'AGENTS_LIST_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
