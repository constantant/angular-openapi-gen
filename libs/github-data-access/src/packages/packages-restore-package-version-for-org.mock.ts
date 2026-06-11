import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_RESTORE_PACKAGE_VERSION_FOR_ORG } from './packages-restore-package-version-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/restore-package-version-for-org',
  path: '/orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore',
  method: 'post',
  tag: 'packages',
};

export function providePackagesRestorePackageVersionForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_RESTORE_PACKAGE_VERSION_FOR_ORG,
    'PACKAGES_RESTORE_PACKAGE_VERSION_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
