import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST } from './orgs-delete-attestations-by-subject-digest.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/delete-attestations-by-subject-digest',
  path: '/orgs/{org}/attestations/digest/{subject_digest}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsDeleteAttestationsBySubjectDigestMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST,
    'ORGS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST',
    initialBehavior,
    _meta,
  );
}
