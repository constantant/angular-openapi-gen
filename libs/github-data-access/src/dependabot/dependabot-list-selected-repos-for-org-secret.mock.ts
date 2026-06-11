import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_LIST_SELECTED_REPOS_FOR_ORG_SECRET } from './dependabot-list-selected-repos-for-org-secret.token';
import type { DependabotListSelectedReposForOrgSecretResponse } from './dependabot-list-selected-repos-for-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/list-selected-repos-for-org-secret',
  path: '/orgs/{org}/dependabot/secrets/{secret_name}/repositories',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotListSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<DependabotListSelectedReposForOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_LIST_SELECTED_REPOS_FOR_ORG_SECRET,
    'DEPENDABOT_LIST_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
