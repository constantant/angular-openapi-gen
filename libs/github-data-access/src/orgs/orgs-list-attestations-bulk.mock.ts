import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ATTESTATIONS_BULK } from './orgs-list-attestations-bulk.token';
import type { OrgsListAttestationsBulkResponse } from './orgs-list-attestations-bulk.token';

export function provideOrgsListAttestationsBulkMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListAttestationsBulkResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ATTESTATIONS_BULK,
    'ORGS_LIST_ATTESTATIONS_BULK',
    initialBehavior,
  );
}
