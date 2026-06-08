import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_REMOVE_TOKEN_FOR_ORG } from './actions-create-remove-token-for-org.token';
import type { ActionsCreateRemoveTokenForOrgResponse } from './actions-create-remove-token-for-org.token';

export function provideActionsCreateRemoveTokenForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateRemoveTokenForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_REMOVE_TOKEN_FOR_ORG,
    'ACTIONS_CREATE_REMOVE_TOKEN_FOR_ORG',
    initialBehavior,
  );
}
