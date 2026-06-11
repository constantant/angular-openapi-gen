import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ATTESTATIONS_BULK } from './orgs-list-attestations-bulk.token';
import type { OrgsListAttestationsBulkResponse } from './orgs-list-attestations-bulk.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-attestations-bulk',
  path: '/orgs/{org}/attestations/bulk-list',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsListAttestationsBulkMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListAttestationsBulkResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ATTESTATIONS_BULK,
    'ORGS_LIST_ATTESTATIONS_BULK',
    initialBehavior,
    _meta,
  );
}
