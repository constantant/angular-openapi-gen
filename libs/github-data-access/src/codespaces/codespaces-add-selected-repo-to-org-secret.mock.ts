import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_ADD_SELECTED_REPO_TO_ORG_SECRET } from './codespaces-add-selected-repo-to-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/add-selected-repo-to-org-secret',
  path: '/orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}',
  method: 'put',
  tag: 'codespaces',
};

export function provideCodespacesAddSelectedRepoToOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_ADD_SELECTED_REPO_TO_ORG_SECRET,
    'CODESPACES_ADD_SELECTED_REPO_TO_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
