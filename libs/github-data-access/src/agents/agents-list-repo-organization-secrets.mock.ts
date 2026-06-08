import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_REPO_ORGANIZATION_SECRETS } from './agents-list-repo-organization-secrets.token';
import type { AgentsListRepoOrganizationSecretsResponse } from './agents-list-repo-organization-secrets.token';

export function provideAgentsListRepoOrganizationSecretsMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListRepoOrganizationSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_REPO_ORGANIZATION_SECRETS,
    'AGENTS_LIST_REPO_ORGANIZATION_SECRETS',
    initialBehavior,
  );
}
