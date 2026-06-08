import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES } from './repos-custom-properties-for-repos-create-or-update-repository-values.token';

export function provideReposCustomPropertiesForReposCreateOrUpdateRepositoryValuesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES,
    'REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES',
    initialBehavior,
  );
}
