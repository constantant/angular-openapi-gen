import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES } from './repos-custom-properties-for-repos-create-or-update-repository-values.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'repos/custom-properties-for-repos-create-or-update-repository-values',
  path: '/repos/{owner}/{repo}/properties/values',
  method: 'patch',
  tag: 'repos',
};

export function provideReposCustomPropertiesForReposCreateOrUpdateRepositoryValuesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES,
    'REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES',
    initialBehavior,
    _meta,
  );
}
