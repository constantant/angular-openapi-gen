import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ATTESTATIONS } from './orgs-list-attestations.token';
import type { OrgsListAttestationsResponse } from './orgs-list-attestations.token';

export function provideOrgsListAttestationsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListAttestationsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ATTESTATIONS,
    'ORGS_LIST_ATTESTATIONS',
    initialBehavior,
  );
}
