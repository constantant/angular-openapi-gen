import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_ATTESTATIONS_BULK } from './users-delete-attestations-bulk.token';

export function provideUsersDeleteAttestationsBulkMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_ATTESTATIONS_BULK,
    'USERS_DELETE_ATTESTATIONS_BULK',
    initialBehavior,
  );
}
