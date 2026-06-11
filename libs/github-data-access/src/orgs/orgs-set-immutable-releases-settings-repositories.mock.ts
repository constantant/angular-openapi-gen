import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_SET_IMMUTABLE_RELEASES_SETTINGS_REPOSITORIES } from './orgs-set-immutable-releases-settings-repositories.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/set-immutable-releases-settings-repositories',
  path: '/orgs/{org}/settings/immutable-releases/repositories',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsSetImmutableReleasesSettingsRepositoriesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_SET_IMMUTABLE_RELEASES_SETTINGS_REPOSITORIES,
    'ORGS_SET_IMMUTABLE_RELEASES_SETTINGS_REPOSITORIES',
    initialBehavior,
    _meta,
  );
}
