import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_GET_ORG_VARIABLE } from './agents-get-org-variable.token';
import type { AgentsGetOrgVariableResponse } from './agents-get-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/get-org-variable',
  path: '/orgs/{org}/agents/variables/{name}',
  method: 'get',
  tag: 'agents',
};

export function provideAgentsGetOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<AgentsGetOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_GET_ORG_VARIABLE,
    'AGENTS_GET_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
