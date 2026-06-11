import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_ORG_VARIABLES } from './agents-list-org-variables.token';
import type { AgentsListOrgVariablesResponse } from './agents-list-org-variables.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/list-org-variables',
  path: '/orgs/{org}/agents/variables',
  method: 'get',
  tag: 'agents',
};

export function provideAgentsListOrgVariablesMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListOrgVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_ORG_VARIABLES,
    'AGENTS_LIST_ORG_VARIABLES',
    initialBehavior,
    _meta,
  );
}
