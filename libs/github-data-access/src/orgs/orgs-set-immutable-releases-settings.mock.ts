import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_SET_IMMUTABLE_RELEASES_SETTINGS } from './orgs-set-immutable-releases-settings.token';

export function provideOrgsSetImmutableReleasesSettingsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_SET_IMMUTABLE_RELEASES_SETTINGS,
    'ORGS_SET_IMMUTABLE_RELEASES_SETTINGS',
    initialBehavior,
  );
}
