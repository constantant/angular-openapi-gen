import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_DELETE_PACKAGE_FOR_ORG } from './packages-delete-package-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/delete-package-for-org',
  path: '/orgs/{org}/packages/{package_type}/{package_name}',
  method: 'delete',
  tag: 'packages',
};

export function providePackagesDeletePackageForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_DELETE_PACKAGE_FOR_ORG,
    'PACKAGES_DELETE_PACKAGE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
