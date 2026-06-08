import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST } from './users-delete-attestations-by-subject-digest.token';

export function provideUsersDeleteAttestationsBySubjectDigestMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST,
    'USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST',
    initialBehavior,
  );
}
