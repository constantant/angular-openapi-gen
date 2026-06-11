import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_PACKAGE_VERSION_FOR_ORGANIZATION } from './packages-get-package-version-for-organization.token';
import type { PackagesGetPackageVersionForOrganizationResponse } from './packages-get-package-version-for-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/get-package-version-for-organization',
  path: '/orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}',
  method: 'get',
  tag: 'packages',
};

export function providePackagesGetPackageVersionForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetPackageVersionForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_PACKAGE_VERSION_FOR_ORGANIZATION,
    'PACKAGES_GET_PACKAGE_VERSION_FOR_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
