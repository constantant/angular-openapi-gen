import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_ATTESTATIONS_BULK } from './users-list-attestations-bulk.token';
import type { UsersListAttestationsBulkResponse } from './users-list-attestations-bulk.token';

export function provideUsersListAttestationsBulkMock(
  initialBehavior?: ProviderInitialBehavior<UsersListAttestationsBulkResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_ATTESTATIONS_BULK,
    'USERS_LIST_ATTESTATIONS_BULK',
    initialBehavior,
  );
}
