import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_ENABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION } from './orgs-enable-selected-repository-immutable-releases-organization.token';

export function provideOrgsEnableSelectedRepositoryImmutableReleasesOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_ENABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION,
    'ORGS_ENABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION',
    initialBehavior,
  );
}
