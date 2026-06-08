import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ALLOWED_ACTIONS_REPOSITORY } from './actions-set-allowed-actions-repository.token';

export function provideActionsSetAllowedActionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ALLOWED_ACTIONS_REPOSITORY,
    'ACTIONS_SET_ALLOWED_ACTIONS_REPOSITORY',
    initialBehavior,
  );
}
