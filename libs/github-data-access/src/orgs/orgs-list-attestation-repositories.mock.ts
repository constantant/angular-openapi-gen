import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ATTESTATION_REPOSITORIES } from './orgs-list-attestation-repositories.token';
import type { OrgsListAttestationRepositoriesResponse } from './orgs-list-attestation-repositories.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-attestation-repositories',
  path: '/orgs/{org}/attestations/repositories',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListAttestationRepositoriesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListAttestationRepositoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ATTESTATION_REPOSITORIES,
    'ORGS_LIST_ATTESTATION_REPOSITORIES',
    initialBehavior,
    _meta,
  );
}
