import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_REPO_ORGANIZATION_VARIABLES } from './agents-list-repo-organization-variables.token';
import type { AgentsListRepoOrganizationVariablesResponse } from './agents-list-repo-organization-variables.token';

export function provideAgentsListRepoOrganizationVariablesMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListRepoOrganizationVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_REPO_ORGANIZATION_VARIABLES,
    'AGENTS_LIST_REPO_ORGANIZATION_VARIABLES',
    initialBehavior,
  );
}
