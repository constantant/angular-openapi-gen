import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_ATTESTATIONS_BY_ID } from './users-delete-attestations-by-id.token';

export function provideUsersDeleteAttestationsByIdMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_ATTESTATIONS_BY_ID,
    'USERS_DELETE_ATTESTATIONS_BY_ID',
    initialBehavior,
  );
}
