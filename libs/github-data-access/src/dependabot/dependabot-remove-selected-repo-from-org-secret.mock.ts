import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_REMOVE_SELECTED_REPO_FROM_ORG_SECRET } from './dependabot-remove-selected-repo-from-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/remove-selected-repo-from-org-secret',
  path: '/orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}',
  method: 'delete',
  tag: 'dependabot',
};

export function provideDependabotRemoveSelectedRepoFromOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_REMOVE_SELECTED_REPO_FROM_ORG_SECRET,
    'DEPENDABOT_REMOVE_SELECTED_REPO_FROM_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
