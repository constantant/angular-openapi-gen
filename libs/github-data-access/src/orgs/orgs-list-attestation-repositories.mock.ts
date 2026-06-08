import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ATTESTATION_REPOSITORIES } from './orgs-list-attestation-repositories.token';
import type { OrgsListAttestationRepositoriesResponse } from './orgs-list-attestation-repositories.token';

export function provideOrgsListAttestationRepositoriesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListAttestationRepositoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ATTESTATION_REPOSITORIES,
    'ORGS_LIST_ATTESTATION_REPOSITORIES',
    initialBehavior,
  );
}
