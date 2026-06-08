import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ORG_VARIABLE } from './actions-get-org-variable.token';
import type { ActionsGetOrgVariableResponse } from './actions-get-org-variable.token';

export function provideActionsGetOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ORG_VARIABLE,
    'ACTIONS_GET_ORG_VARIABLE',
    initialBehavior,
  );
}
