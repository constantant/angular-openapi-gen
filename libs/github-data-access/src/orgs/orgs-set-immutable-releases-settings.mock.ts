import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_SET_IMMUTABLE_RELEASES_SETTINGS } from './orgs-set-immutable-releases-settings.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/set-immutable-releases-settings',
  path: '/orgs/{org}/settings/immutable-releases',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsSetImmutableReleasesSettingsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_SET_IMMUTABLE_RELEASES_SETTINGS,
    'ORGS_SET_IMMUTABLE_RELEASES_SETTINGS',
    initialBehavior,
    _meta,
  );
}
