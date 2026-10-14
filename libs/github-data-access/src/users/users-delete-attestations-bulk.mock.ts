import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideUsersDeleteAttestationsBulk } from './users-delete-attestations-bulk.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/delete-attestations-bulk',
  path: '/users/{username}/attestations/delete-request',
  method: 'post',
  tag: 'users',
};

export const USERS_DELETE_ATTESTATIONS_BULK_MOCK: MockEndpoint<unknown> = {
  key: 'USERS_DELETE_ATTESTATIONS_BULK',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideUsersDeleteAttestationsBulk,
};

export function provideUsersDeleteAttestationsBulkMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_DELETE_ATTESTATIONS_BULK_MOCK,
    initialBehavior,
  );
}
