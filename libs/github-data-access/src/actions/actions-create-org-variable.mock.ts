import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_ORG_VARIABLE } from './actions-create-org-variable.token';
import type { ActionsCreateOrgVariableResponse } from './actions-create-org-variable.token';

export function provideActionsCreateOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_ORG_VARIABLE,
    'ACTIONS_CREATE_ORG_VARIABLE',
    initialBehavior,
  );
}
