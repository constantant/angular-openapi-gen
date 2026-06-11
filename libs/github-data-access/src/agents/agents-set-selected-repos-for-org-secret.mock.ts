import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_SET_SELECTED_REPOS_FOR_ORG_SECRET } from './agents-set-selected-repos-for-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/set-selected-repos-for-org-secret',
  path: '/orgs/{org}/agents/secrets/{secret_name}/repositories',
  method: 'put',
  tag: 'agents',
};

export function provideAgentsSetSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_SET_SELECTED_REPOS_FOR_ORG_SECRET,
    'AGENTS_SET_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
