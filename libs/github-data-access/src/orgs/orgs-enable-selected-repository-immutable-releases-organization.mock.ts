import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_ENABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION } from './orgs-enable-selected-repository-immutable-releases-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'orgs/enable-selected-repository-immutable-releases-organization',
  path: '/orgs/{org}/settings/immutable-releases/repositories/{repository_id}',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsEnableSelectedRepositoryImmutableReleasesOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_ENABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION,
    'ORGS_ENABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
