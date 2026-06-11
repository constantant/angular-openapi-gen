import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET } from './agents-remove-selected-repo-from-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/remove-selected-repo-from-org-secret',
  path: '/orgs/{org}/agents/secrets/{secret_name}/repositories/{repository_id}',
  method: 'delete',
  tag: 'agents',
};

export function provideAgentsRemoveSelectedRepoFromOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET,
    'AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
