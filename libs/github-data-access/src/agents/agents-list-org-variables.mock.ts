import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_ORG_VARIABLES } from './agents-list-org-variables.token';
import type { AgentsListOrgVariablesResponse } from './agents-list-org-variables.token';

export function provideAgentsListOrgVariablesMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListOrgVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_ORG_VARIABLES,
    'AGENTS_LIST_ORG_VARIABLES',
    initialBehavior,
  );
}
