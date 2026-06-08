import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_ORG_VARIABLES } from './actions-list-org-variables.token';
import type { ActionsListOrgVariablesResponse } from './actions-list-org-variables.token';

export function provideActionsListOrgVariablesMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListOrgVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_ORG_VARIABLES,
    'ACTIONS_LIST_ORG_VARIABLES',
    initialBehavior,
  );
}
