import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ALLOWED_ACTIONS_ORGANIZATION } from './actions-set-allowed-actions-organization.token';

export function provideActionsSetAllowedActionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ALLOWED_ACTIONS_ORGANIZATION,
    'ACTIONS_SET_ALLOWED_ACTIONS_ORGANIZATION',
    initialBehavior,
  );
}
