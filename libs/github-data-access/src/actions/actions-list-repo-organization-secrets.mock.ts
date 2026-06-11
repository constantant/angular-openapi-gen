import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_REPO_ORGANIZATION_SECRETS } from './actions-list-repo-organization-secrets.token';
import type { ActionsListRepoOrganizationSecretsResponse } from './actions-list-repo-organization-secrets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-repo-organization-secrets',
  path: '/repos/{owner}/{repo}/actions/organization-secrets',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListRepoOrganizationSecretsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRepoOrganizationSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_REPO_ORGANIZATION_SECRETS,
    'ACTIONS_LIST_REPO_ORGANIZATION_SECRETS',
    initialBehavior,
    _meta,
  );
}
