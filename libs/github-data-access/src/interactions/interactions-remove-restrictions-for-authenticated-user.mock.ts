import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_REMOVE_RESTRICTIONS_FOR_AUTHENTICATED_USER } from './interactions-remove-restrictions-for-authenticated-user.token';

export function provideInteractionsRemoveRestrictionsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_REMOVE_RESTRICTIONS_FOR_AUTHENTICATED_USER,
    'INTERACTIONS_REMOVE_RESTRICTIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
