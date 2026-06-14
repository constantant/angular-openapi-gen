import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_DELETE_PACKAGE_FOR_AUTHENTICATED_USER } from './packages-delete-package-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/delete-package-for-authenticated-user',
  path: '/user/packages/{package_type}/{package_name}',
  method: 'delete',
  tag: 'packages',
};

export function providePackagesDeletePackageForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_DELETE_PACKAGE_FOR_AUTHENTICATED_USER,
    'PACKAGES_DELETE_PACKAGE_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
    options,
  );
}
