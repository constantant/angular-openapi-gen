import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_PACKAGE_FOR_ORGANIZATION } from './packages-get-package-for-organization.token';
import type { PackagesGetPackageForOrganizationResponse } from './packages-get-package-for-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/get-package-for-organization',
  path: '/orgs/{org}/packages/{package_type}/{package_name}',
  method: 'get',
  tag: 'packages',
};

export function providePackagesGetPackageForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetPackageForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_PACKAGE_FOR_ORGANIZATION,
    'PACKAGES_GET_PACKAGE_FOR_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
