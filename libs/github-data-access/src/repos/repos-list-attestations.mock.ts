import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_ATTESTATIONS } from './repos-list-attestations.token';
import type { ReposListAttestationsResponse } from './repos-list-attestations.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-attestations',
  path: '/repos/{owner}/{repo}/attestations/{subject_digest}',
  method: 'get',
  tag: 'repos',
};

export function provideReposListAttestationsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListAttestationsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_ATTESTATIONS,
    'REPOS_LIST_ATTESTATIONS',
    initialBehavior,
    _meta,
  );
}
