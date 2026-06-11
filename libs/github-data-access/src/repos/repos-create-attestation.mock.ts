import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_ATTESTATION } from './repos-create-attestation.token';
import type { ReposCreateAttestationResponse } from './repos-create-attestation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-attestation',
  path: '/repos/{owner}/{repo}/attestations',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateAttestationMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateAttestationResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_ATTESTATION,
    'REPOS_CREATE_ATTESTATION',
    initialBehavior,
    _meta,
  );
}
