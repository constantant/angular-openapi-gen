import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_ATTESTATIONS_BULK } from './orgs-delete-attestations-bulk.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/delete-attestations-bulk',
  path: '/orgs/{org}/attestations/delete-request',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsDeleteAttestationsBulkMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_ATTESTATIONS_BULK,
    'ORGS_DELETE_ATTESTATIONS_BULK',
    initialBehavior,
    _meta,
  );
}
