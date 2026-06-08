import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_ATTESTATIONS_BY_ID } from './orgs-delete-attestations-by-id.token';

export function provideOrgsDeleteAttestationsByIdMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_ATTESTATIONS_BY_ID,
    'ORGS_DELETE_ATTESTATIONS_BY_ID',
    initialBehavior,
  );
}
