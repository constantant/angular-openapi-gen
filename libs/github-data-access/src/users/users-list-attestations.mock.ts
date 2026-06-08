import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_ATTESTATIONS } from './users-list-attestations.token';
import type { UsersListAttestationsResponse } from './users-list-attestations.token';

export function provideUsersListAttestationsMock(
  initialBehavior?: ProviderInitialBehavior<UsersListAttestationsResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_ATTESTATIONS,
    'USERS_LIST_ATTESTATIONS',
    initialBehavior,
  );
}
