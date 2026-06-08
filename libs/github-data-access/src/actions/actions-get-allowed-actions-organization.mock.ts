import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ALLOWED_ACTIONS_ORGANIZATION } from './actions-get-allowed-actions-organization.token';
import type { ActionsGetAllowedActionsOrganizationResponse } from './actions-get-allowed-actions-organization.token';

export function provideActionsGetAllowedActionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetAllowedActionsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ALLOWED_ACTIONS_ORGANIZATION,
    'ACTIONS_GET_ALLOWED_ACTIONS_ORGANIZATION',
    initialBehavior,
  );
}
