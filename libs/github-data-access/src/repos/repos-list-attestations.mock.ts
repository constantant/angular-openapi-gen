import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_ATTESTATIONS } from './repos-list-attestations.token';
import type { ReposListAttestationsResponse } from './repos-list-attestations.token';

export function provideReposListAttestationsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListAttestationsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_ATTESTATIONS,
    'REPOS_LIST_ATTESTATIONS',
    initialBehavior,
  );
}
