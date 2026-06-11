import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_ATTESTATIONS_BY_ID } from './orgs-delete-attestations-by-id.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/delete-attestations-by-id',
  path: '/orgs/{org}/attestations/{attestation_id}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsDeleteAttestationsByIdMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_ATTESTATIONS_BY_ID,
    'ORGS_DELETE_ATTESTATIONS_BY_ID',
    initialBehavior,
    _meta,
  );
}
