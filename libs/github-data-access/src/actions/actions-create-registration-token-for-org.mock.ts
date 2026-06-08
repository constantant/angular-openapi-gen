import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_ORG } from './actions-create-registration-token-for-org.token';
import type { ActionsCreateRegistrationTokenForOrgResponse } from './actions-create-registration-token-for-org.token';

export function provideActionsCreateRegistrationTokenForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateRegistrationTokenForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_ORG,
    'ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_ORG',
    initialBehavior,
  );
}
