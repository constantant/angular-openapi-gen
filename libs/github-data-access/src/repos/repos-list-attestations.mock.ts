import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListAttestations,
  type ReposListAttestationsResponse,
} from './repos-list-attestations.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-attestations',
  path: '/repos/{owner}/{repo}/attestations/{subject_digest}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_ATTESTATIONS_MOCK: MockEndpoint<ReposListAttestationsResponse> =
  {
    key: 'REPOS_LIST_ATTESTATIONS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposListAttestations,
  };

export function provideReposListAttestationsMock(
  initialBehavior?: MockEndpointBehavior<ReposListAttestationsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_LIST_ATTESTATIONS_MOCK, initialBehavior);
}
