import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_REMOVE_SELECTED_REPO_FROM_ORG_SECRET } from './codespaces-remove-selected-repo-from-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/remove-selected-repo-from-org-secret',
  path: '/orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}',
  method: 'delete',
  tag: 'codespaces',
};

export function provideCodespacesRemoveSelectedRepoFromOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_REMOVE_SELECTED_REPO_FROM_ORG_SECRET,
    'CODESPACES_REMOVE_SELECTED_REPO_FROM_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
