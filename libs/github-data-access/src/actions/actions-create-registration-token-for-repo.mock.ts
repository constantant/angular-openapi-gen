import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_REPO } from './actions-create-registration-token-for-repo.token';
import type { ActionsCreateRegistrationTokenForRepoResponse } from './actions-create-registration-token-for-repo.token';

export function provideActionsCreateRegistrationTokenForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateRegistrationTokenForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_REPO,
    'ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_REPO',
    initialBehavior,
  );
}
