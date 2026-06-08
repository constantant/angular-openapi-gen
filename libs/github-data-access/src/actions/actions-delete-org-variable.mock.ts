import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ORG_VARIABLE } from './actions-delete-org-variable.token';

export function provideActionsDeleteOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ORG_VARIABLE,
    'ACTIONS_DELETE_ORG_VARIABLE',
    initialBehavior,
  );
}
