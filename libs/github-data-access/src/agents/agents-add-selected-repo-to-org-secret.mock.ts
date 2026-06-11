import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_ADD_SELECTED_REPO_TO_ORG_SECRET } from './agents-add-selected-repo-to-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/add-selected-repo-to-org-secret',
  path: '/orgs/{org}/agents/secrets/{secret_name}/repositories/{repository_id}',
  method: 'put',
  tag: 'agents',
};

export function provideAgentsAddSelectedRepoToOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_ADD_SELECTED_REPO_TO_ORG_SECRET,
    'AGENTS_ADD_SELECTED_REPO_TO_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
