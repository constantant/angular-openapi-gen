import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCustomPropertiesForReposGetRepositoryValues,
  type ReposCustomPropertiesForReposGetRepositoryValuesResponse,
} from './repos-custom-properties-for-repos-get-repository-values.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/custom-properties-for-repos-get-repository-values',
  path: '/repos/{owner}/{repo}/properties/values',
  method: 'get',
  tag: 'repos',
};

export const REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES_MOCK: MockEndpoint<ReposCustomPropertiesForReposGetRepositoryValuesResponse> =
  {
    key: 'REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCustomPropertiesForReposGetRepositoryValues,
  };

export function provideReposCustomPropertiesForReposGetRepositoryValuesMock(
  initialBehavior?: MockEndpointBehavior<ReposCustomPropertiesForReposGetRepositoryValuesResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES_MOCK,
    initialBehavior,
  );
}
