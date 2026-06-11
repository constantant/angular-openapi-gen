import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_GET_IMMUTABLE_RELEASES_SETTINGS_REPOSITORIES } from './orgs-get-immutable-releases-settings-repositories.token';
import type { OrgsGetImmutableReleasesSettingsRepositoriesResponse } from './orgs-get-immutable-releases-settings-repositories.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/get-immutable-releases-settings-repositories',
  path: '/orgs/{org}/settings/immutable-releases/repositories',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsGetImmutableReleasesSettingsRepositoriesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetImmutableReleasesSettingsRepositoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_IMMUTABLE_RELEASES_SETTINGS_REPOSITORIES,
    'ORGS_GET_IMMUTABLE_RELEASES_SETTINGS_REPOSITORIES',
    initialBehavior,
    _meta,
  );
}
