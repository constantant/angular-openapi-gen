import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposCustomPropertiesForReposCreateOrUpdateRepositoryValues } from './repos-custom-properties-for-repos-create-or-update-repository-values.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'repos/custom-properties-for-repos-create-or-update-repository-values',
  path: '/repos/{owner}/{repo}/properties/values',
  method: 'patch',
  tag: 'repos',
};

export const REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES_MOCK: MockEndpoint<unknown> =
  {
    key: 'REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCustomPropertiesForReposCreateOrUpdateRepositoryValues,
  };

export function provideReposCustomPropertiesForReposCreateOrUpdateRepositoryValuesMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES_MOCK,
    initialBehavior,
  );
}
