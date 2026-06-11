import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_ADD_SELECTED_REPO_TO_ORG_SECRET } from './dependabot-add-selected-repo-to-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/add-selected-repo-to-org-secret',
  path: '/orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}',
  method: 'put',
  tag: 'dependabot',
};

export function provideDependabotAddSelectedRepoToOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_ADD_SELECTED_REPO_TO_ORG_SECRET,
    'DEPENDABOT_ADD_SELECTED_REPO_TO_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
