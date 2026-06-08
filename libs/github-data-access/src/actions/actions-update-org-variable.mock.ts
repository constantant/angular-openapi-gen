import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_UPDATE_ORG_VARIABLE } from './actions-update-org-variable.token';

export function provideActionsUpdateOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_UPDATE_ORG_VARIABLE,
    'ACTIONS_UPDATE_ORG_VARIABLE',
    initialBehavior,
  );
}
