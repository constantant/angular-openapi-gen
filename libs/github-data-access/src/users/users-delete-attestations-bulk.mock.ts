import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_ATTESTATIONS_BULK } from './users-delete-attestations-bulk.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/delete-attestations-bulk',
  path: '/users/{username}/attestations/delete-request',
  method: 'post',
  tag: 'users',
};

export function provideUsersDeleteAttestationsBulkMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_ATTESTATIONS_BULK,
    'USERS_DELETE_ATTESTATIONS_BULK',
    initialBehavior,
    _meta,
  );
}
