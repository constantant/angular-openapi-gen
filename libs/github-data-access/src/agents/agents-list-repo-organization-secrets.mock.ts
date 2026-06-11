import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_REPO_ORGANIZATION_SECRETS } from './agents-list-repo-organization-secrets.token';
import type { AgentsListRepoOrganizationSecretsResponse } from './agents-list-repo-organization-secrets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/list-repo-organization-secrets',
  path: '/repos/{owner}/{repo}/agents/organization-secrets',
  method: 'get',
  tag: 'agents',
};

export function provideAgentsListRepoOrganizationSecretsMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListRepoOrganizationSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_REPO_ORGANIZATION_SECRETS,
    'AGENTS_LIST_REPO_ORGANIZATION_SECRETS',
    initialBehavior,
    _meta,
  );
}
