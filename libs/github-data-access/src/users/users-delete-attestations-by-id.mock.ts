import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideUsersDeleteAttestationsById } from './users-delete-attestations-by-id.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/delete-attestations-by-id',
  path: '/users/{username}/attestations/{attestation_id}',
  method: 'delete',
  tag: 'users',
};

export const USERS_DELETE_ATTESTATIONS_BY_ID_MOCK: MockEndpoint<unknown> = {
  key: 'USERS_DELETE_ATTESTATIONS_BY_ID',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideUsersDeleteAttestationsById,
};

export function provideUsersDeleteAttestationsByIdMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_DELETE_ATTESTATIONS_BY_ID_MOCK,
    initialBehavior,
  );
}
