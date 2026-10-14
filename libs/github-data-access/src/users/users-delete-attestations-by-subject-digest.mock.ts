import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideUsersDeleteAttestationsBySubjectDigest } from './users-delete-attestations-by-subject-digest.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/delete-attestations-by-subject-digest',
  path: '/users/{username}/attestations/digest/{subject_digest}',
  method: 'delete',
  tag: 'users',
};

export const USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST_MOCK: MockEndpoint<unknown> =
  {
    key: 'USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersDeleteAttestationsBySubjectDigest,
  };

export function provideUsersDeleteAttestationsBySubjectDigestMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST_MOCK,
    initialBehavior,
  );
}
