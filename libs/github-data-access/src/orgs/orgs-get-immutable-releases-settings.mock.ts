import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_GET_IMMUTABLE_RELEASES_SETTINGS } from './orgs-get-immutable-releases-settings.token';
import type { OrgsGetImmutableReleasesSettingsResponse } from './orgs-get-immutable-releases-settings.token';

export function provideOrgsGetImmutableReleasesSettingsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetImmutableReleasesSettingsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_IMMUTABLE_RELEASES_SETTINGS,
    'ORGS_GET_IMMUTABLE_RELEASES_SETTINGS',
    initialBehavior,
  );
}
