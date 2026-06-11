import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_LIST_PACKAGES_FOR_ORGANIZATION } from './packages-list-packages-for-organization.token';
import type { PackagesListPackagesForOrganizationResponse } from './packages-list-packages-for-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/list-packages-for-organization',
  path: '/orgs/{org}/packages',
  method: 'get',
  tag: 'packages',
};

export function providePackagesListPackagesForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<PackagesListPackagesForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_LIST_PACKAGES_FOR_ORGANIZATION,
    'PACKAGES_LIST_PACKAGES_FOR_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
