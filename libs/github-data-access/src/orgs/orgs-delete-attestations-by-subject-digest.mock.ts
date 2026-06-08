import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST } from './orgs-delete-attestations-by-subject-digest.token';

export function provideOrgsDeleteAttestationsBySubjectDigestMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST,
    'ORGS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST',
    initialBehavior,
  );
}
