import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_REPO_ORGANIZATION_SECRETS } from './actions-list-repo-organization-secrets.token';
import type { ActionsListRepoOrganizationSecretsResponse } from './actions-list-repo-organization-secrets.token';

export function provideActionsListRepoOrganizationSecretsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRepoOrganizationSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_REPO_ORGANIZATION_SECRETS,
    'ACTIONS_LIST_REPO_ORGANIZATION_SECRETS',
    initialBehavior,
  );
}
