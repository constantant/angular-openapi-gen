import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_GET_IMMUTABLE_RELEASES_SETTINGS } from './orgs-get-immutable-releases-settings.token';
import type { OrgsGetImmutableReleasesSettingsResponse } from './orgs-get-immutable-releases-settings.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/get-immutable-releases-settings',
  path: '/orgs/{org}/settings/immutable-releases',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsGetImmutableReleasesSettingsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetImmutableReleasesSettingsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_IMMUTABLE_RELEASES_SETTINGS,
    'ORGS_GET_IMMUTABLE_RELEASES_SETTINGS',
    initialBehavior,
    _meta,
  );
}
