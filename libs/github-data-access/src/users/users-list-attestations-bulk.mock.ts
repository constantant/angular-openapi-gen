import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_LIST_ATTESTATIONS_BULK } from './users-list-attestations-bulk.token';
import type { UsersListAttestationsBulkResponse } from './users-list-attestations-bulk.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-attestations-bulk',
  path: '/users/{username}/attestations/bulk-list',
  method: 'post',
  tag: 'users',
};

export function provideUsersListAttestationsBulkMock(
  initialBehavior?: ProviderInitialBehavior<UsersListAttestationsBulkResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_ATTESTATIONS_BULK,
    'USERS_LIST_ATTESTATIONS_BULK',
    initialBehavior,
    _meta,
    options,
  );
}
