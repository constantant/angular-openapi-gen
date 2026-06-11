import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_RESTORE_PACKAGE_FOR_ORG } from './packages-restore-package-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/restore-package-for-org',
  path: '/orgs/{org}/packages/{package_type}/{package_name}/restore',
  method: 'post',
  tag: 'packages',
};

export function providePackagesRestorePackageForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_RESTORE_PACKAGE_FOR_ORG,
    'PACKAGES_RESTORE_PACKAGE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
