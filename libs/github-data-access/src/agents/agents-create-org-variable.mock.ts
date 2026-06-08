import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_CREATE_ORG_VARIABLE } from './agents-create-org-variable.token';
import type { AgentsCreateOrgVariableResponse } from './agents-create-org-variable.token';

export function provideAgentsCreateOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<AgentsCreateOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_CREATE_ORG_VARIABLE,
    'AGENTS_CREATE_ORG_VARIABLE',
    initialBehavior,
  );
}
