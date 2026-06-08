import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_ATTESTATIONS_BULK } from './orgs-delete-attestations-bulk.token';

export function provideOrgsDeleteAttestationsBulkMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_ATTESTATIONS_BULK,
    'ORGS_DELETE_ATTESTATIONS_BULK',
    initialBehavior,
  );
}
