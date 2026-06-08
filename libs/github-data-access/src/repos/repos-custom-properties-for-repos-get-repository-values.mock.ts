import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES } from './repos-custom-properties-for-repos-get-repository-values.token';
import type { ReposCustomPropertiesForReposGetRepositoryValuesResponse } from './repos-custom-properties-for-repos-get-repository-values.token';

export function provideReposCustomPropertiesForReposGetRepositoryValuesMock(
  initialBehavior?: ProviderInitialBehavior<ReposCustomPropertiesForReposGetRepositoryValuesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES,
    'REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES',
    initialBehavior,
  );
}
