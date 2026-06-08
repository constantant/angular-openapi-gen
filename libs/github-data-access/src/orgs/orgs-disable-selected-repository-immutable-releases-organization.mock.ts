import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_DISABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION } from './orgs-disable-selected-repository-immutable-releases-organization.token';

export function provideOrgsDisableSelectedRepositoryImmutableReleasesOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DISABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION,
    'ORGS_DISABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION',
    initialBehavior,
  );
}
