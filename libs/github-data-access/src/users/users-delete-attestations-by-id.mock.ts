import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_ATTESTATIONS_BY_ID } from './users-delete-attestations-by-id.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/delete-attestations-by-id',
  path: '/users/{username}/attestations/{attestation_id}',
  method: 'delete',
  tag: 'users',
};

export function provideUsersDeleteAttestationsByIdMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_ATTESTATIONS_BY_ID,
    'USERS_DELETE_ATTESTATIONS_BY_ID',
    initialBehavior,
    _meta,
  );
}
