import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_ADD_SELECTED_REPO_TO_ORG_SECRET } from './actions-add-selected-repo-to-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/add-selected-repo-to-org-secret',
  path: '/orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}',
  method: 'put',
  tag: 'actions',
};

export function provideActionsAddSelectedRepoToOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ADD_SELECTED_REPO_TO_ORG_SECRET,
    'ACTIONS_ADD_SELECTED_REPO_TO_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
