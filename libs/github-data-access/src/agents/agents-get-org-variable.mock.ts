import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_GET_ORG_VARIABLE } from './agents-get-org-variable.token';
import type { AgentsGetOrgVariableResponse } from './agents-get-org-variable.token';

export function provideAgentsGetOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<AgentsGetOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_GET_ORG_VARIABLE,
    'AGENTS_GET_ORG_VARIABLE',
    initialBehavior,
  );
}
