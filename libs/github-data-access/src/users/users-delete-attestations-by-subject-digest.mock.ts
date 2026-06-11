import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST } from './users-delete-attestations-by-subject-digest.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/delete-attestations-by-subject-digest',
  path: '/users/{username}/attestations/digest/{subject_digest}',
  method: 'delete',
  tag: 'users',
};

export function provideUsersDeleteAttestationsBySubjectDigestMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST,
    'USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST',
    initialBehavior,
    _meta,
  );
}
