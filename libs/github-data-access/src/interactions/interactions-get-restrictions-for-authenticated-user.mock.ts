import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_GET_RESTRICTIONS_FOR_AUTHENTICATED_USER } from './interactions-get-restrictions-for-authenticated-user.token';
import type { InteractionsGetRestrictionsForAuthenticatedUserResponse } from './interactions-get-restrictions-for-authenticated-user.token';

export function provideInteractionsGetRestrictionsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<InteractionsGetRestrictionsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_GET_RESTRICTIONS_FOR_AUTHENTICATED_USER,
    'INTERACTIONS_GET_RESTRICTIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
